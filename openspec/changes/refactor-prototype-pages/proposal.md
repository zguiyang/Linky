# Change: 重构原型页面架构

## Why

当前的原型页面架构存在冗余和用户体验问题，包括独立的搜索页面、首页落地页以及缺少全局搜索功能，导致用户体验碎片化和导航效率低下。

## What Changes

- 移除 `search.html` 搜索页面
- 移除 `index.html` 首页落地页
- 将 `bookmarks.html` 书签页调整为新的首页
- 实现全局搜索功能，类似 command dialog 的交互体验
- 优化页面导航和用户工作流

## Impact

- Affected specs: UI 架构、用户导航、搜索体验
- Affected code: prd/ 目录下的 HTML 文件、导航组件、搜索功能实现
- **BREAKING**: 现有的页面 URL 结构将发生变化