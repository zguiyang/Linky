import { Job } from 'adonisjs-jobs'
import logger from '@adonisjs/core/services/logger'
import app from '@adonisjs/core/services/app'
import { AiService } from '#services/ai_service'
import { SettingService } from '#services/setting_service'
import { TransmitService } from '#services/transmit_service'
import PromptService from '#services/prompt_service'
import Bookmark from '#models/bookmark'
import Tag from '#models/tag'
import { AI_TAG, BOOKMARK_EVENTS } from '#constants/index'
import type { UserAiConfig } from '#types/ai'

export interface GenerateAiTagsPayload {
  bookmarkId: number
  userId: number
}

export interface GenerateAiTagsResult {
  success: boolean
  tagsCreated: number
  tagsReused: number
  error?: string
}

interface AiTagSuggestion {
  name: string
  confidence: number
}

export default class GenerateAiTags extends Job {
  private settingService = new SettingService()
  private promptService = new PromptService()

  async handle(payload: GenerateAiTagsPayload): Promise<GenerateAiTagsResult> {
    const { bookmarkId, userId } = payload

    try {
      const bookmark = await Bookmark.find(bookmarkId)
      if (!bookmark || bookmark.userId !== userId) {
        logger.warn(`[GenerateAiTags] Bookmark not found: ${bookmarkId}`)
        return { success: false, tagsCreated: 0, tagsReused: 0, error: 'NOT_FOUND' }
      }

      if (!bookmark.metadata?.success) {
        logger.info(`[GenerateAiTags] Metadata not fetched, skip: ${bookmarkId}`)
        return { success: false, tagsCreated: 0, tagsReused: 0, error: 'METADATA_NOT_FETCHED' }
      }

      const aiConfig = await this.settingService.getAiConfig(userId)
      const apiKey = await this.settingService.decryptAiApiKey(userId)

      logger.info(
        `[GenerateAiTags] AI config: enabled=${aiConfig?.aiEnabled}, baseUrl=${aiConfig?.aiBaseUrl}, modelName=${aiConfig?.aiModelName}, apiKey=${apiKey ? `****${apiKey.slice(-4)}` : 'null'}`
      )

      if (!aiConfig?.aiEnabled) {
        logger.warn(`[GenerateAiTags] AI not enabled for user ${userId}`)
        return { success: false, tagsCreated: 0, tagsReused: 0, error: 'AI_DISABLED' }
      }

      if (!aiConfig.aiBaseUrl || !apiKey || !aiConfig.aiModelName) {
        logger.warn(`[GenerateAiTags] AI config incomplete for user ${userId}`)
        return { success: false, tagsCreated: 0, tagsReused: 0, error: 'AI_CONFIG_INCOMPLETE' }
      }

      const aiServiceConfig: UserAiConfig = {
        baseUrl: aiConfig.aiBaseUrl,
        apiKey: apiKey,
        modelName: aiConfig.aiModelName,
        enabled: aiConfig.aiEnabled,
      }

      const userTags = await Tag.query().where('userId', userId).exec()
      const existingTagNames = new Set(userTags.map((t) => t.name.toLowerCase().trim()))

      const prompt = this.promptService.render('tag_generation', {
        title: bookmark.title || '无',
        description: bookmark.description || '无',
        maxTags: AI_TAG.MAX_TAGS,
        existingTags: Array.from(existingTagNames).join(', '),
      })

      const response = await AiService.chat(aiServiceConfig, {
        messages: [
          { role: 'system', content: this.promptService.render('system') },
          { role: 'user', content: prompt },
        ],
        model: aiConfig.aiModelName,
        temperature: AI_TAG.TEMPERATURE,
        max_tokens: AI_TAG.MAX_TAGS * 50,
        response_format: { type: 'json_object' as const },
      })

      if (!response.success) {
        logger.error(
          { err: response.error },
          `[GenerateAiTags] AI request failed for bookmark ${bookmarkId}`
        )
        return { success: false, tagsCreated: 0, tagsReused: 0, error: 'AI_REQUEST_FAILED' }
      }

      const content = response.data.choices[0]?.message?.content
      if (!content) {
        return { success: false, tagsCreated: 0, tagsReused: 0, error: 'AI_NO_CONTENT' }
      }

      const suggestions = this.parseResponse(content)
      const validTags = suggestions
        .filter((t) => t.confidence >= AI_TAG.CONFIDENCE_THRESHOLD)
        .slice(0, AI_TAG.MAX_TAGS)

      const processedTags = new Set<string>()
      const tagsToCreate: { name: string; userId: number; isAiGenerated: boolean }[] = []
      const tagIdsToAttach: number[] = []

      for (const suggestion of validTags) {
        const tagName = suggestion.name.trim()
        const tagNameLower = tagName.toLowerCase()

        if (processedTags.has(tagNameLower)) continue
        processedTags.add(tagNameLower)

        if (existingTagNames.has(tagNameLower)) {
          const existingTag = userTags.find((t) => t.name.toLowerCase().trim() === tagNameLower)
          if (existingTag) {
            tagIdsToAttach.push(existingTag.id)
          }
        } else {
          tagsToCreate.push({
            name: tagName,
            userId,
            isAiGenerated: true,
          })
        }
      }

      let tagsCreated = 0
      if (tagsToCreate.length > 0) {
        const newTags = await Tag.createMany(tagsToCreate)
        const newTagIds = newTags.map((t) => t.id)
        tagIdsToAttach.push(...newTagIds)
        tagsCreated = newTags.length
      }

      if (tagIdsToAttach.length > 0) {
        await bookmark.related('tags').attach(tagIdsToAttach)
      }

      const tagsReused = tagIdsToAttach.length - tagsCreated

      logger.info(
        `[GenerateAiTags] Completed: ${bookmarkId}, created: ${tagsCreated}, reused: ${tagsReused}`
      )

      await this.pushBookmarkUpdate(userId, bookmarkId)

      return { success: true, tagsCreated, tagsReused }
    } catch (error: any) {
      logger.error({ err: error }, `[GenerateAiTags] Error processing bookmark ${bookmarkId}`)
      return { success: false, tagsCreated: 0, tagsReused: 0, error: 'INTERNAL_ERROR' }
    }
  }

  private async pushBookmarkUpdate(userId: number, bookmarkId: number): Promise<void> {
    try {
      const transmitService = await app.container.make(TransmitService)
      const bookmark = await Bookmark.query().where('id', bookmarkId).preload('tags').first()

      if (bookmark) {
        await transmitService.toUser(userId, BOOKMARK_EVENTS.BOOKMARK_UPDATED, bookmark.toJSON())
      }
    } catch (error) {
      logger.error(
        { err: error },
        `[GenerateAiTags] Failed to push update for bookmark ${bookmarkId}`
      )
    }
  }

  private parseResponse(content: string): AiTagSuggestion[] {
    try {
      const parsed = JSON.parse(content)
      if (Array.isArray(parsed.tags)) {
        return parsed.tags.map((t: any) => ({
          name: String(t.name || ''),
          confidence: Number(t.confidence) || 0,
        }))
      }
      return []
    } catch {
      logger.warn(`[GenerateAiTags] Failed to parse AI response: ${content.substring(0, 100)}`)
      return []
    }
  }
}
