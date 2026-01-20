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
router.on('/workspace/bookmarks').renderInertia('workspace/bookmarks')
router.on('/workspace/memos').renderInertia('workspace/memos')

// 认证页面（保留前端页面，Session认证会实现后端逻辑）
router.on('/sign-in').renderInertia('auth/sign-in').middleware(middleware.guest())
router.on('/sign-up').renderInertia('auth/sign-up').middleware(middleware.guest())

// 认证API路由
router
  .post('/auth/register', '#controllers/auth_controller.register')
  .middleware(middleware.guest())
router.post('/auth/login', '#controllers/auth_controller.login').middleware(middleware.guest())
router.post('/auth/logout', '#controllers/auth_controller.logout').middleware(middleware.auth())
