import { OpenAI } from 'openai'
import { Readable } from 'node:stream'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'
import type {
  UserAiConfig,
  AiChatParams,
  AiChatResponse,
  AiStreamChunk,
  AiStreamHandler,
  AiChatResponseError,
  AiChatSuccessResponse,
} from '#types/ai'
import { AI } from '#constants'
import logger from '@adonisjs/core/services/logger'
import type { HttpContext } from '@adonisjs/core/http'

export class AiService {
  static async chat(userConfig: UserAiConfig, params: AiChatParams): Promise<AiChatResponse> {
    if (!userConfig.enabled) {
      return this.formatError('AI_DISABLED', 'AI feature is not enabled for this user')
    }

    if (!userConfig.apiKey) {
      return this.formatError('MISSING_API_KEY', 'AI API key is not configured')
    }

    if (!userConfig.baseUrl) {
      return this.formatError('MISSING_BASE_URL', 'AI base URL is not configured')
    }

    const client = new OpenAI({
      baseURL: userConfig.baseUrl,
      apiKey: userConfig.apiKey,
      timeout: AI.DEFAULT_TIMEOUT,
      maxRetries: AI.DEFAULT_MAX_RETRIES,
    })

    try {
      const response = await client.chat.completions.create({
        model: params.model,
        messages: params.messages as any,
        tools: params.tools as any,
        stream: params.stream ?? false,
        temperature: params.temperature,
        max_tokens: params.max_tokens,
        top_p: params.top_p,
        frequency_penalty: params.frequency_penalty,
        presence_penalty: params.presence_penalty,
        response_format: params.response_format as any,
        user: params.user,
      })

      if (params.stream) {
        return {
          success: true,
          data: response as any,
        }
      }

      const data = response as any

      logger.info(
        'AI chat request completed: model=%s, tokens=%d',
        params.model,
        data.usage?.total_tokens ?? 0
      )

      return {
        success: true,
        data: {
          id: data.id,
          object: 'chat.completion',
          created: data.created,
          model: data.model,
          choices: data.choices.map((choice: any) => ({
            index: choice.index,
            message: {
              role: choice.message.role,
              content: choice.message.content,
              tool_calls: choice.message.tool_calls?.map((tc: any) => ({
                id: tc.id,
                type: tc.type,
                function: {
                  name: tc.function.name,
                  arguments: tc.function.arguments,
                },
              })),
            },
            finish_reason: choice.finish_reason,
          })),
          usage: data.usage
            ? {
                prompt_tokens: data.usage.prompt_tokens,
                completion_tokens: data.usage.completion_tokens,
                total_tokens: data.usage.total_tokens,
              }
            : undefined,
        },
      }
    } catch (error: any) {
      logger.error({ err: error }, 'AI chat request failed')
      return this.formatOpenAiError(error)
    }
  }

  static async streamChat(
    userConfig: UserAiConfig,
    params: AiChatParams,
    handler: AiStreamHandler
  ): Promise<void> {
    if (!userConfig.enabled) {
      handler.onError(this.formatError('AI_DISABLED', 'AI feature is not enabled'))
      return
    }

    if (!userConfig.apiKey) {
      handler.onError(this.formatError('MISSING_API_KEY', 'AI API key is not configured'))
      return
    }

    const client = new OpenAI({
      baseURL: userConfig.baseUrl,
      apiKey: userConfig.apiKey,
      timeout: AI.DEFAULT_TIMEOUT,
      maxRetries: AI.DEFAULT_MAX_RETRIES,
    })

    try {
      const stream = await client.chat.completions.create({
        model: params.model,
        messages: params.messages as any,
        tools: params.tools as any,
        stream: true,
        temperature: params.temperature,
        max_tokens: params.max_tokens,
        user: params.user,
      })

      for await (const chunk of stream) {
        const formattedChunk: AiStreamChunk = {
          id: chunk.id,
          object: 'chat.completion.chunk',
          created: chunk.created,
          model: chunk.model,
          choices: chunk.choices.map((choice: any) => ({
            index: choice.index,
            delta: {
              role: choice.delta.role,
              content: choice.delta.content,
              tool_calls: choice.delta.tool_calls?.map((tc: any) => ({
                index: tc.index,
                id: tc.id,
                type: tc.type,
                function: {
                  name: tc.function?.name,
                  arguments: tc.function?.arguments,
                },
              })),
            },
            finish_reason: choice.finish_reason,
          })),
        }

        handler.onChunk(formattedChunk)
      }

      logger.info('AI stream completed: model=%s', params.model)
    } catch (error: any) {
      logger.error({ err: error }, 'AI stream request failed')
      handler.onError(this.formatOpenAiError(error))
    }
  }

  static async streamToSse(
    userConfig: UserAiConfig,
    params: AiChatParams,
    response: HttpContext['response']
  ): Promise<void> {
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
        await AiService.streamChat(userConfig, params, {
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
        })

        if (!hasError && completeResponse && completeResponse.usage) {
          sendEvent(controller, 'usage', completeResponse.usage)
        }

        controller.close()
      },
    })

    const nodeReadable = Readable.fromWeb(webStream as unknown as NodeReadableStream)
    return response.stream(nodeReadable)
  }

  private static formatOpenAiError(error: any): AiChatResponseError {
    if (error.status) {
      return this.formatError(
        `HTTP_${error.status}`,
        error.message || 'OpenAI API request failed',
        error.type,
        error.param
      )
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      return this.formatError('NETWORK_ERROR', `Unable to connect to AI service: ${error.message}`)
    }

    if (error.status === 429) {
      return this.formatError(
        'RATE_LIMIT',
        'AI service rate limit exceeded. Please try again later.',
        'rate_limit'
      )
    }

    return this.formatError('UNKNOWN_ERROR', error.message || 'An unexpected error occurred')
  }

  static formatError(
    code: string,
    message: string,
    type?: string,
    param?: string
  ): AiChatResponseError {
    return {
      success: false,
      error: {
        code,
        message,
        type,
        param,
      },
    }
  }
}
