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

const AuthController = () => import('#controllers/auth_controller')
const TagsController = () => import('#controllers/tags_controller')
const BookmarksController = () => import('#controllers/bookmarks_controller')
const MemosController = () => import('#controllers/memos_controller')

// API路由组
router
  .group(() => {
    // 认证API
    router.post('/auth/register', [AuthController, 'register'])
    router.post('/auth/login', [AuthController, 'login'])
    router.post('/auth/logout', [AuthController, 'logout']).middleware(middleware.auth())
    router.post('/auth/forgot-password', [AuthController, 'forgotPassword'])
    router.post('/auth/reset-password', [AuthController, 'resetPassword'])
    router.get('/auth/verify-email', [AuthController, 'verifyEmail'])
    router
      .post('/auth/resend-verification', [AuthController, 'resendVerification'])
      .middleware(middleware.auth())
    router.get('/auth/me', [AuthController, 'me']).middleware(middleware.auth())

    // 标签 API（所有路由需要认证）
    router.get('/tags', [TagsController, 'index'])
    router.get('/tags/:id', [TagsController, 'show'])
    router.post('/tags', [TagsController, 'store'])
    router.put('/tags/:id', [TagsController, 'update'])
    router.delete('/tags/:id', [TagsController, 'destroy'])

    // 书签 API（所有路由需要认证）
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

    // 备忘录 API（所有路由需要认证）
    router.get('/memos', [MemosController, 'index'])
    router.get('/memos/paginate', [MemosController, 'paginate'])
    router.get('/memos/:id', [MemosController, 'show'])
    router.post('/memos', [MemosController, 'store'])
    router.put('/memos/:id', [MemosController, 'update'])
    router.delete('/memos/:id', [MemosController, 'destroy'])
  })
  .prefix('api')
  .middleware(middleware.auth())

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
