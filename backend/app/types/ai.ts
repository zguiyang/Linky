export type MessageRole = 'system' | 'user' | 'assistant' | 'tool'

export interface MessageContent {
  role: MessageRole
  content: string
  name?: string
  tool_calls?: Array<{
    id: string
    type: 'function'
    function: {
      name: string
      arguments: string
    }
  }>
  tool_call_id?: string
}

export interface ToolDefinition {
  type: 'function'
  function: {
    name: string
    description?: string
    parameters?: {
      type: 'object'
      properties: Record<
        string,
        {
          type: string
          description?: string
          enum?: string[]
        }
      >
      required?: string[]
    }
  }
}

export type ResponseFormatType = 'json_object' | 'text'

export interface AiChatParams {
  messages: MessageContent[]
  model: string
  tools?: ToolDefinition[]
  stream?: boolean
  temperature?: number
  max_tokens?: number
  top_p?: number
  frequency_penalty?: number
  presence_penalty?: number
  response_format?: {
    type: ResponseFormatType
  }
  user?: string
}

export interface TokenUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface AiResponseMessage {
  role: string
  content: string | null
  tool_calls?: Array<{
    id: string
    type: string
    function: {
      name: string
      arguments: string
    }
  }>
}

export interface AiResponseChoice {
  index: number
  message: AiResponseMessage
  finish_reason: string | null
}

export interface AiChatSuccessResponse {
  id: string
  object: 'chat.completion'
  created: number
  model: string
  choices: AiResponseChoice[]
  usage?: TokenUsage
}

export interface AiChatResponseSuccess {
  success: true
  data: AiChatSuccessResponse
}

export interface AiChatResponseError {
  success: false
  error: {
    code: string
    message: string
    type?: string
    param?: string
  }
}

export type AiChatResponse = AiChatResponseSuccess | AiChatResponseError

export interface AiStreamChunk {
  id: string
  object: 'chat.completion.chunk'
  created: number
  model: string
  choices: Array<{
    index: number
    delta: {
      role?: string
      content?: string | null
      tool_calls?: Array<{
        index: number
        id?: string
        type?: string
        function?: {
          name?: string
          arguments?: string
        }
      }>
    }
    finish_reason?: string | null
  }>
}

export interface AiStreamHandler {
  onChunk: (chunk: AiStreamChunk) => void
  onComplete: (response: AiChatSuccessResponse) => void
  onError: (error: AiChatResponseError) => void
}

export interface UserAiConfig {
  baseUrl: string | null
  apiKey: string | null
  modelName: string | null
  enabled: boolean
}
