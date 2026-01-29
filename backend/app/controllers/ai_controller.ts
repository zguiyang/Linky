import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { AiService } from '#services/ai_service'
import { SettingService } from '#services/setting_service'
import { chatValidator } from '#validators/ai'

@inject()
export default class AiController {
  constructor(private settingService: SettingService) {}

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
      return AiService.formatError('MISSING_API_KEY', 'AI API key is not configured')
    }

    const response = await AiService.chat(
      {
        baseUrl: aiConfig.aiBaseUrl,
        apiKey,
        modelName: aiConfig.aiModelName,
        enabled: aiConfig.aiEnabled,
      },
      {
        model: data.model,
        messages: data.messages as any,
        tools: data.tools as any,
        stream: data.stream,
        temperature: data.temperature,
        max_tokens: data.max_tokens,
        top_p: data.top_p,
        frequency_penalty: data.frequency_penalty,
        presence_penalty: data.presence_penalty,
        response_format: data.response_format,
      }
    )

    return response
  }

  async stream({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const chatData = await request.validateUsing(chatValidator)

    const { aiConfig, apiKey } = await this.getAiConfigAndKey(user.id)

    if (!apiKey) {
      return response
        .status(400)
        .json(AiService.formatError('MISSING_API_KEY', 'AI API key is not configured'))
    }

    return AiService.streamToSse(
      {
        baseUrl: aiConfig.aiBaseUrl,
        apiKey,
        modelName: aiConfig.aiModelName,
        enabled: aiConfig.aiEnabled,
      },
      {
        model: chatData.model,
        messages: chatData.messages as any,
        tools: chatData.tools as any,
        temperature: chatData.temperature,
        max_tokens: chatData.max_tokens,
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
