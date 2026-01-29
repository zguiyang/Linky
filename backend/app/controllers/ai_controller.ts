import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { AiService } from '#services/ai_service'
import { SettingService } from '#services/setting_service'
import { chatValidator } from '#validators/ai'

@inject()
export default class AiController {
  constructor(private settingService: SettingService) {}

  async chat({ auth, request }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(chatValidator)

    const aiConfig = await this.settingService.getAiConfig(user.id)
    const apiKey = await this.settingService.decryptAiApiKey(user.id)

    if (!apiKey) {
      return {
        success: false,
        error: {
          code: 'MISSING_API_KEY',
          message: 'AI API key is not configured',
        },
      }
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
