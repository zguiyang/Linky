import { request } from '~/lib/request'
import type { UserSettings, UpdateSettingsRequest } from './types'

export const settingsApi = {
  getAiConfig: () => request.get<UserSettings>('/settings/ai'),

  updateAiConfig: (data: UpdateSettingsRequest) =>
    request.put<UserSettings>('/settings/ai', data)
}

export default settingsApi
