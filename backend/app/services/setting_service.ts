import { inject } from '@adonisjs/core'
import encryption from '@adonisjs/core/services/encryption'
import logger from '@adonisjs/core/services/logger'
import UserConfig from '#models/user_config'

@inject()
export class SettingService {
  async getAiConfig(userId: number) {
    const config = await UserConfig.findBy('userId', userId)
    return {
      aiBaseUrl: config?.aiBaseUrl ?? null,
      aiModelName: config?.aiModelName ?? null,
      aiEnabled: config?.aiEnabled ?? false,
    }
  }

  async updateAiConfig(
    userId: number,
    data: {
      aiBaseUrl?: string | null
      aiApiKey?: string | null
      aiModelName?: string | null
      aiEnabled?: boolean
    }
  ) {
    let config = await UserConfig.findBy('userId', userId)

    if (!config) {
      config = new UserConfig()
      config.userId = userId
    }

    if (data.aiBaseUrl !== undefined) {
      config.aiBaseUrl = data.aiBaseUrl
    }

    if (data.aiApiKey !== undefined) {
      if (data.aiApiKey === null || data.aiApiKey === '') {
        config.aiApiKey = null
      } else {
        config.aiApiKey = encryption.encrypt(data.aiApiKey)
      }
    }

    if (data.aiModelName !== undefined) {
      config.aiModelName = data.aiModelName
    }

    if (data.aiEnabled !== undefined) {
      config.aiEnabled = data.aiEnabled
    }

    await config.save()

    logger.info('User AI config updated for user %s', userId)

    return {
      aiBaseUrl: config.aiBaseUrl,
      aiModelName: config.aiModelName,
      aiEnabled: config.aiEnabled,
    }
  }

  async decryptAiApiKey(userId: number): Promise<string | null> {
    const config = await UserConfig.findBy('userId', userId)
    if (!config?.aiApiKey) return null

    try {
      return encryption.decrypt(config.aiApiKey)
    } catch (error) {
      logger.error({ err: error }, 'Failed to decrypt AI API key for user %s', userId)
      return null
    }
  }
}
