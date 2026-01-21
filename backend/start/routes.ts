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
  })
  .prefix('api')
