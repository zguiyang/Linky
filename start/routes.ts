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

// 首页
router.on('/').renderInertia('home')

// 工作区页面
router.on('/workspace/bookmarks').renderInertia('workspace/bookmarks').middleware(middleware.auth())
router.on('/workspace/memos').renderInertia('workspace/memos').middleware(middleware.auth())

// 认证页面（保留前端页面，Session认证会实现后端逻辑）
router.on('/sign-in').renderInertia('auth/sign-in').middleware(middleware.guest())
router.on('/sign-up').renderInertia('auth/sign-up').middleware(middleware.guest())
router
  .on('/auth/forgot-password')
  .renderInertia('auth/forgot-password')
  .middleware(middleware.guest())
router
  .on('/auth/reset-password')
  .renderInertia('auth/reset-password')
  .middleware(middleware.guest())
router.on('/auth/verify-email').renderInertia('auth/verify-email').middleware(middleware.guest())

// API路由组
router
  .group(() => {
    // 认证API
    router
      .post('/auth/register', '#controllers/auth_controller.register')
      .middleware(middleware.guest())
    router.post('/auth/login', '#controllers/auth_controller.login').middleware(middleware.guest())
    router.post('/auth/logout', '#controllers/auth_controller.logout').middleware(middleware.auth())
    router
      .post('/auth/forgot-password', '#controllers/auth_controller.forgotPassword')
      .middleware(middleware.guest())
    router
      .post('/auth/reset-password', '#controllers/auth_controller.resetPassword')
      .middleware(middleware.guest())
    router.get('/auth/verify-email', '#controllers/auth_controller.verifyEmail')
    router
      .post('/auth/resend-verification', '#controllers/auth_controller.resendVerification')
      .middleware(middleware.auth())
    router.get('/auth/me', '#controllers/auth_controller.me').middleware(middleware.auth())
  })
  .prefix('api')
