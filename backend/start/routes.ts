/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import env from '#start/env'
import transmit from '@adonisjs/transmit/services/main'
import { apiLimiter, authLimiter, searchLimiter, aiChatLimiter } from '#start/limiter'

import { TRANSMIT_CHANNEL_NAMES } from '#constants/index'

const AuthController = () => import('#controllers/auth_controller')
const TagsController = () => import('#controllers/tags_controller')
const BookmarksController = () => import('#controllers/bookmarks_controller')
const MemosController = () => import('#controllers/memos_controller')
const SettingsController = () => import('#controllers/settings_controller')
const AiController = () => import('#controllers/ai_controller')
const SearchController = () => import('#controllers/search_controller')

// 公开认证路由组（不需要认证）- 更严格的限流
router
  .group(() => {
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])
    router.post('/auth/forgot-password', [AuthController, 'forgotPassword'])
    router.post('/auth/reset-password', [AuthController, 'resetPassword'])
    router.get('/auth/verify-email', [AuthController, 'verifyEmail'])
  })
  .prefix('api')
  .use(authLimiter)

// 受保护 API 路由组（需要认证）
router
  .group(() => {
    router.post('/auth/logout', [AuthController, 'logout']).middleware(middleware.auth())
    router
      .post('/auth/resend-verification', [AuthController, 'resendVerification'])
      .middleware(middleware.auth())
    router.get('/auth/me', [AuthController, 'me']).middleware(middleware.auth())

    // 标签 API
    router.get('/tags', [TagsController, 'index'])
    router.get('/tags/:id', [TagsController, 'show'])
    router.get('/tags/:id/items', [TagsController, 'items'])
    router.post('/tags', [TagsController, 'store'])
    router.put('/tags/:id', [TagsController, 'update'])
    router.delete('/tags/:id', [TagsController, 'destroy'])

    // 书签 API
    router.get('/bookmarks', [BookmarksController, 'index'])
    router.get('/bookmarks/paginate', [BookmarksController, 'paginate'])
    router.get('/bookmarks/fetching-count', [BookmarksController, 'fetchingCount'])
    router.get('/bookmarks/:id', [BookmarksController, 'show'])
    router.post('/bookmarks', [BookmarksController, 'store'])
    router.post('/bookmarks/by-url', [BookmarksController, 'createByUrl'])
    router.post('/bookmarks/:id/refresh-metadata', [BookmarksController, 'refreshMetadata'])
    router.post('/bookmarks/import', [BookmarksController, 'import'])
    router.get('/bookmarks/import/:jobId/status', [BookmarksController, 'importStatus'])
    router.put('/bookmarks/:id', [BookmarksController, 'update'])
    router.delete('/bookmarks/:id', [BookmarksController, 'destroy'])

    // 备忘录 API
    router.get('/memos', [MemosController, 'index'])
    router.get('/memos/paginate', [MemosController, 'paginate'])
    router.get('/memos/:id', [MemosController, 'show'])
    router.post('/memos', [MemosController, 'store'])
    router.put('/memos/:id', [MemosController, 'update'])
    router.delete('/memos/:id', [MemosController, 'destroy'])

    // 设置 API
    router.get('/settings/ai', [SettingsController, 'getAiConfig'])
    router.put('/settings/ai', [SettingsController, 'updateAiConfig'])

    // AI API - 独立限流
    router.get('/ai/config', [AiController, 'getConfig'])
    router.post('/ai/chat', [AiController, 'chat']).use(aiChatLimiter)
    router.post('/ai/chat/stream', [AiController, 'stream']).use(aiChatLimiter)

    // 全局搜索 - 独立限流
    router.get('/search', [SearchController, 'search']).use(searchLimiter)
  })
  .prefix('api')
  .middleware(middleware.auth())
  .use(apiLimiter)

// Jobs Dashboard（GUI 界面）- 仅管理员可访问
router.jobs('/jobs').use(async (ctx, next) => {
  if (env.get('NODE_ENV') === 'development') {
    return next()
  }

  const adminSecret = env.get('ADMIN_SECRET')

  if (!adminSecret) {
    return ctx.response.forbidden({ errors: [{ message: 'Dashboard access not configured' }] })
  }

  const requestSecret = ctx.request.header('x-admin-secret')

  if (requestSecret !== adminSecret) {
    return ctx.response.forbidden({ errors: [{ message: 'Access denied' }] })
  }

  return next()
})

// Register Transmit routes (no auth middleware needed for events endpoint)
// Authorization is handled by transmit.authorize() for each channel
transmit.registerRoutes()

// Configure channel authorization
transmit.authorize(`${TRANSMIT_CHANNEL_NAMES.BOOKMARKS}:userId`, (ctx, { userId }) => {
  if (!ctx.auth.isAuthenticated) {
    return false
  }
  return Number(ctx.auth.user?.id) === Number(userId)
})
