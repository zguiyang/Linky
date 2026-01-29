import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { updateSettingsValidator } from '#validators/setting'
import { SettingService } from '#services/setting_service'

@inject()
export default class SettingsController {
  constructor(private settingService: SettingService) {}

  async getAiConfig({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return this.settingService.getAiConfig(user.id)
  }

  async updateAiConfig({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateSettingsValidator)
    return this.settingService.updateAiConfig(user.id, data)
  }
}
