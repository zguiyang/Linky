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

// API路由组
router
  .group(() => {
    // 认证API
    router.post('/auth/register', '#controllers/auth_controller.register')
    router.post('/auth/login', '#controllers/auth_controller.login')
    router.post('/auth/logout', '#controllers/auth_controller.logout').middleware(middleware.auth())
    router.post('/auth/forgot-password', '#controllers/auth_controller.forgotPassword')
    router.post('/auth/reset-password', '#controllers/auth_controller.resetPassword')
    router.get('/auth/verify-email', '#controllers/auth_controller.verifyEmail')
    router
      .post('/auth/resend-verification', '#controllers/auth_controller.resendVerification')
      .middleware(middleware.auth())
    router.get('/auth/me', '#controllers/auth_controller.me').middleware(middleware.auth())

    // 标签 API（所有路由需要认证）
    router.get('/tags', '#controllers/tags_controller.index')
    router.get('/tags/:id', '#controllers/tags_controller.show')
    router.post('/tags', '#controllers/tags_controller.store')
    router.put('/tags/:id', '#controllers/tags_controller.update')
    router.delete('/tags/:id', '#controllers/tags_controller.destroy')

    // 书签 API（所有路由需要认证）
    router.get('/bookmarks', '#controllers/bookmarks_controller.index')
    router.get('/bookmarks/paginate', '#controllers/bookmarks_controller.paginate')
    router.get('/bookmarks/:id', '#controllers/bookmarks_controller.show')
    router.post('/bookmarks', '#controllers/bookmarks_controller.store')
    router.post('/bookmarks/import', '#controllers/bookmarks_controller.import')
    router.put('/bookmarks/:id', '#controllers/bookmarks_controller.update')
    router.delete('/bookmarks/:id', '#controllers/bookmarks_controller.destroy')

    // 备忘录 API（所有路由需要认证）
    router.get('/memos', '#controllers/memos_controller.index')
    router.get('/memos/paginate', '#controllers/memos_controller.paginate')
    router.get('/memos/:id', '#controllers/memos_controller.show')
    router.post('/memos', '#controllers/memos_controller.store')
    router.put('/memos/:id', '#controllers/memos_controller.update')
    router.delete('/memos/:id', '#controllers/memos_controller.destroy')
  })
  .prefix('api')
  .middleware(middleware.auth())
