import { Edge } from 'edge.js'
import app from '@adonisjs/core/services/app'
import logger from '@adonisjs/core/services/logger'

const edge = new Edge()

const promptsPath = app.makePath('resources/prompts')
edge.mount(promptsPath)

export default class PromptService {
  render(name: string, data: Record<string, any> = {}): string {
    try {
      return edge.renderSync(`${name}`, data)
    } catch (error) {
      logger.error({ err: error }, `[PromptService] Failed to render: ${name}`)
      throw error
    }
  }
}
