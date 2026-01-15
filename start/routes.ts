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
