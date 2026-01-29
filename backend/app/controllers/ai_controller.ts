import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Readable } from 'node:stream'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'
import { AiService } from '#services/ai_service'
import { SettingService } from '#services/setting_service'
import { chatValidator } from '#validators/ai'
import type { AiChatResponse, AiStreamChunk, AiChatSuccessResponse } from '#types/ai'

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

  async stream({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const chatData = await request.validateUsing(chatValidator)

    const aiConfig = await this.settingService.getAiConfig(user.id)
    const apiKey = await this.settingService.decryptAiApiKey(user.id)

    if (!apiKey) {
      return response.status(400).json({
        error: {
          code: 'MISSING_API_KEY',
          message: 'AI API key is not configured',
        },
      })
    }

    response.header('Content-Type', 'text/event-stream')
    response.header('Cache-Control', 'no-cache')
    response.header('Connection', 'keep-alive')

    let completeResponse: AiChatSuccessResponse | null = null
    let hasError = false

    const sendEvent = (
      controller: ReadableStreamDefaultController,
      event: string,
      eventData: unknown
    ) => {
      const encoder = new TextEncoder()
      const message = `event: ${event}\ndata: ${JSON.stringify(eventData)}\n\n`
      controller.enqueue(encoder.encode(message))
    }

    const webStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        await AiService.streamChat(
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
          {
            onChunk: (chunk: AiStreamChunk) => {
              sendEvent(controller, 'chunk', chunk)
            },
            onComplete: (resp: AiChatSuccessResponse) => {
              completeResponse = resp
              sendEvent(controller, 'complete', resp)
            },
            onError: (error: AiChatResponse) => {
              hasError = true
              sendEvent(controller, 'error', error)
            },
          }
        )

        if (!hasError && completeResponse && completeResponse.usage) {
          sendEvent(controller, 'usage', completeResponse.usage)
        }

        controller.close()
      },
    })

    const nodeReadable = Readable.fromWeb(webStream as unknown as NodeReadableStream)
    return response.stream(nodeReadable)
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
