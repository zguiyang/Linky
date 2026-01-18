/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// 首页
router.on('/').renderInertia('home')

// 工作区页面
router.on('/workspace/bookmarks').renderInertia('workspace/bookmarks')
router.on('/workspace/memos').renderInertia('workspace/memos')

// 认证页面
router.on('/sign-in').renderInertia('auth/sign-in')
router.on('/sign-up').renderInertia('auth/sign-up')

// API 认证路由
router.post('/api/auth/register', '#controllers/auth_controller.register')
router.post('/api/auth/login', '#controllers/auth_controller.login')
router
  .post('/api/auth/logout', '#controllers/auth_controller.logout')
  .use(async ({ auth }, next) => {
    await auth.authenticateUsing(['api'])
    return next()
  })
