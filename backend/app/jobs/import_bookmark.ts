import { Job } from 'adonisjs-jobs'
import logger from '@adonisjs/core/services/logger'
import { readFile, unlink } from 'node:fs/promises'
import { BookmarkParserService, parseHtml } from '#services/bookmark_parser_service'
import app from '@adonisjs/core/services/app'
import { TransmitService } from '#services/transmit_service'
import { BOOKMARK_EVENTS, TRANSMIT_CHANNEL_NAMES } from '#constants/index'

export interface ImportBookmarkPayload {
  jobId: string
  userId: number
  filePath: string
  createTags: boolean
  skipDuplicates: boolean
  autoAiTag: boolean
}

export interface ImportResult {
  total: number
  imported: number
  skipped: number
  errors: number
  tagsCreated: number
  errorsList: Array<{ title: string; url: string; reason: string }>
}

export interface ImportJobResult {
  jobId: string
  status: 'completed'
  total: number
  imported: number
  skipped: number
  errors: number
  tagsCreated: number
  errorsList: Array<{ title: string; url: string; reason: string }>
  completedAt: string
}

interface ImportJobStatus {
  status: 'waiting' | 'processing' | 'completed' | 'failed'
  current: number
  error?: string
}

export default class ImportBookmark extends Job {
  private bookmarkParserService = new BookmarkParserService()

  async handle(payload: ImportBookmarkPayload) {
    const { jobId, userId, filePath, createTags, skipDuplicates, autoAiTag } = payload

    logger.info(`[ImportBookmark] Job started: ${jobId}`)
    await this.updateStatus(jobId, 'processing', 0)

    try {
      await this.updateProgress(10)
      await this.updateStatus(jobId, 'processing', 10)
      logger.info(`[ImportBookmark] Progress: 10%`)

      const htmlContent = await readFile(filePath, { encoding: 'utf-8' })
      logger.info(`[ImportBookmark] File read, size: ${htmlContent.length}`)
      await this.updateProgress(30)
      await this.updateStatus(jobId, 'processing', 30)
      logger.info(`[ImportBookmark] Progress: 30%`)

      const parseResult = await parseHtml(htmlContent)
      logger.info(`[ImportBookmark] Parsed bookmarks: ${parseResult.bookmarks.length}`)
      await this.updateProgress(50)
      await this.updateStatus(jobId, 'processing', 50)
      logger.info(`[ImportBookmark] Progress: 50%`)

      const transmitService = await app.container.make(TransmitService)
      const result = await this.bookmarkParserService.processImport(userId, parseResult.bookmarks, {
        createTags,
        skipDuplicates,
        autoAiTag,
        onProgress: async (current, total, currentTitle) => {
          await this.updateStatus(jobId, 'processing', current)
          await transmitService.toUser(
            `${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:${userId}`,
            BOOKMARK_EVENTS.IMPORT_PROGRESS,
            {
              jobId,
              current,
              total,
              currentTitle,
            }
          )
        },
      })
      logger.info(`[ImportBookmark] Import result: ${JSON.stringify(result)}`)
      await this.updateProgress(100)
      await this.updateStatus(jobId, 'processing', 100)
      logger.info(`[ImportBookmark] Progress: 100%`)

      await this.storeResult(jobId, result)
      await this.cleanupFile(filePath)

      logger.info(`[ImportBookmark] Job completed: ${jobId}`)
      return result
    } catch (error) {
      logger.error({ err: error }, `[ImportBookmark] Job failed: ${jobId}`)
      await this.updateStatus(
        jobId,
        'failed',
        0,
        error instanceof Error ? error.message : '未知错误'
      )
      await this.cleanupFile(filePath)
      throw error
    }
  }

  private async updateProgress(progress: number) {
    if (this.job) {
      await this.job.updateProgress(progress)
    }
  }

  private async updateStatus(
    jobId: string,
    status: ImportJobStatus['status'],
    current: number,
    error?: string
  ) {
    const { default: redis } = await import('@adonisjs/redis/services/main')

    const jobStatus: ImportJobStatus = {
      status,
      current,
      error,
    }

    const key = `import:status:${jobId}`
    await redis.setex(key, 86400, JSON.stringify(jobStatus))
    logger.info(`[ImportBookmark] Redis SET ${key}: ${JSON.stringify(jobStatus)}`)
  }

  private async storeResult(jobId: string, result: ImportResult) {
    const { default: redis } = await import('@adonisjs/redis/services/main')

    const jobResult: ImportJobResult = {
      jobId,
      status: 'completed',
      ...result,
      completedAt: new Date().toISOString(),
    }

    await redis.setex(`import:result:${jobId}`, 86400, JSON.stringify(jobResult))
    await redis.del(`import:status:${jobId}`)
  }

  private async cleanupFile(filePath: string) {
    try {
      await unlink(filePath)
    } catch (error) {
      logger.error({ err: error }, `[ImportBookmark] Failed to cleanup file: ${filePath}`)
    }
  }
}
