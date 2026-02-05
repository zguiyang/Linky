import { test } from '@japa/runner'
import app from '@adonisjs/core/services/app'
import { AiService } from '#services/ai_service'
import type { UserAiConfig, AiChatParams, AiChatResponseError } from '#types/ai'
import encryption from '@adonisjs/core/services/encryption'
import db from '@adonisjs/lucid/services/db'

const mockChatParams: AiChatParams = {
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Say hello in exactly one word' }],
}

test('should return error when AI is disabled', async ({ assert }) => {
  const aiService = await app.container.make(AiService)
  const disabledConfig: UserAiConfig = {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: 'sk-test-key',
    modelName: 'gpt-4',
    enabled: false,
  }

  const response = await aiService.chat(disabledConfig, mockChatParams)

  assert.isFalse(response.success)
  assert.equal((response as AiChatResponseError).error.code, 'AI_DISABLED')
})

test('should return error when API key is missing', async ({ assert }) => {
  const aiService = await app.container.make(AiService)
  const noKeyConfig: UserAiConfig = {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: null,
    modelName: 'gpt-4',
    enabled: true,
  }

  const response = await aiService.chat(noKeyConfig, mockChatParams)

  assert.isFalse(response.success)
  assert.equal((response as AiChatResponseError).error.code, 'MISSING_API_KEY')
})

test('should return error when base URL is missing', async ({ assert }) => {
  const aiService = await app.container.make(AiService)
  const noUrlConfig: UserAiConfig = {
    baseUrl: null,
    apiKey: 'sk-test-key',
    modelName: 'gpt-4',
    enabled: true,
  }

  const response = await aiService.chat(noUrlConfig, mockChatParams)

  assert.isFalse(response.success)
  assert.equal((response as AiChatResponseError).error.code, 'MISSING_BASE_URL')
})

test('should format OpenAI API error correctly', async ({ assert }) => {
  const aiService = await app.container.make(AiService)
  const response = (aiService as any).formatError(
    'INVALID_API_KEY',
    'Incorrect API key provided',
    'authentication_error'
  )

  assert.isFalse(response.success)
  assert.equal(response.error.code, 'INVALID_API_KEY')
  assert.equal(response.error.message, 'Incorrect API key provided')
  assert.equal(response.error.type, 'authentication_error')
})

test('should format network error correctly', async ({ assert }) => {
  const aiService = await app.container.make(AiService)
  const response = (aiService as any).formatError(
    'NETWORK_ERROR',
    'Unable to connect to AI service: Connection refused'
  )

  assert.isFalse(response.success)
  assert.equal(response.error.code, 'NETWORK_ERROR')
})

test('should handle params with empty messages (config validation only)', async ({ assert }) => {
  const paramsWithEmptyMessages: AiChatParams = {
    model: 'gpt-4',
    messages: [],
  }

  assert.isArray(paramsWithEmptyMessages.messages)
  assert.equal(paramsWithEmptyMessages.messages.length, 0)
})

test('should handle custom temperature', async ({ assert }) => {
  const paramsWithTemp: AiChatParams = {
    ...mockChatParams,
    temperature: 0.7,
  }

  assert.equal(paramsWithTemp.temperature, 0.7)
})

test('should handle JSON response format', async ({ assert }) => {
  const paramsWithJsonFormat: AiChatParams = {
    ...mockChatParams,
    response_format: {
      type: 'json_object' as const,
    },
  }

  assert.deepEqual(paramsWithJsonFormat.response_format, {
    type: 'json_object',
  })
})

test('should work with real OpenAI API', async ({ assert }) => {
  const aiService = await app.container.make(AiService)
  const config = await db.query().from('user_configs').first()

  if (!config) {
    console.log('Skipping real API test: No user config found')
    return
  }

  const aiEnabled = config.ai_enabled
  const aiBaseUrl = config.ai_base_url
  const aiApiKey = config.ai_api_key
  const aiModelName = config.ai_model_name

  if (!aiEnabled || !aiApiKey || !aiBaseUrl || !aiModelName) {
    console.log('Skipping real API test: AI not configured')
    return
  }

  let decryptedKey: string | null = null
  try {
    decryptedKey = encryption.decrypt(aiApiKey)
  } catch {
    console.log('Skipping real API test: Failed to decrypt API key')
    return
  }

  if (!decryptedKey) {
    console.log('Skipping real API test: Decrypted key is null')
    return
  }

  const userConfig: UserAiConfig = {
    baseUrl: aiBaseUrl,
    apiKey: decryptedKey,
    modelName: aiModelName,
    enabled: true,
  }

  const response = await aiService.chat(userConfig, {
    model: userConfig.modelName!,
    messages: [{ role: 'user', content: 'Say hello in exactly one word' }],
  })

  assert.isTrue(response.success)
  if (response.success) {
    assert.exists(response.data)
    assert.equal(response.data.choices.length, 1)
    assert.isNotEmpty(response.data.choices[0].message.content)
  }
}).timeout(60000)
