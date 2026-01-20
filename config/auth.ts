// Access Token认证已移除
// Session认证将在创建User模型后配置
import { defineConfig } from '@adonisjs/auth'

const authConfig = defineConfig({
  default: 'web',
  guards: {
    web: {} as any, // 临时占位，Session认证实现后移除
  },
})

export default authConfig
