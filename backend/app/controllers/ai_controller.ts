import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'
import { AiService } from '#services/ai_service'
import { SettingService } from '#services/setting_service'
import { chatValidator } from '#validators/ai'
import type { MessageContent, ToolDefinition } from '#types/ai'

@inject()
export default class AiController {
  constructor(
    protected settingService: SettingService,
    private aiService: AiService
  ) {}

  private async getAiConfigAndKey(userId: number) {
    const aiConfig = await this.settingService.getAiConfig(userId)
    const apiKey = await this.settingService.decryptAiApiKey(userId)
    return { aiConfig, apiKey }
  }

  async chat({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(chatValidator)

    const { aiConfig, apiKey } = await this.getAiConfigAndKey(user.id)

    if (!apiKey) {
      throw new Exception('AI API key is not configured', { status: 400 })
    }

    const response = await this.aiService.chat(
      {
        baseUrl: aiConfig.aiBaseUrl,
        apiKey,
        modelName: aiConfig.aiModelName,
        enabled: aiConfig.aiEnabled,
      },
      {
        model: data.model,
        messages: data.messages as MessageContent[],
        tools: data.tools as unknown as ToolDefinition[],
        stream: data.stream,
        temperature: data.temperature,
        max_tokens: data.max_tokens,
        top_p: data.top_p,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        response_format: data.response_format as any,
      }
    )

    return response
  }

  async stream({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const chatData = await request.validateUsing(chatValidator)

    const { aiConfig, apiKey } = await this.getAiConfigAndKey(user.id)

    if (!apiKey) {
      throw new Exception('AI API key is not configured', { status: 400 })
    }

    return this.aiService.streamToSse(
      {
        baseUrl: aiConfig.aiBaseUrl,
        apiKey,
        modelName: aiConfig.aiModelName,
        enabled: aiConfig.aiEnabled,
      },
      {
        model: chatData.model,
        messages: chatData.messages as MessageContent[],
        tools: chatData.tools as unknown as ToolDefinition[],
        temperature: chatData.temperature,
        max_tokens: chatData.max_tokens,
        top_p: chatData.top_p,
        frequency_penalty: chatData.frequency_penalty,
        presence_penalty: chatData.presence_penalty,
      },
      response
    )
  }

  async getConfig({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const config = await this.settingService.getAiConfig(user.id)

    return {
      aiBaseUrl: config.aiBaseUrl,
      aiModelName: config.aiModelName,
      aiEnabled: config.aiEnabled,
    }
  }
}
