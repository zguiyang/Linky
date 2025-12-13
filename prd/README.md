# 书签备忘录管理工具 - 高保真原型

## 项目概述

这是一个书签和备忘录管理工具的高保真HTML原型，展示完整的用户界面设计和交互流程。

## 文件说明

- `index.html` - 主导航页面，包含所有功能入口
- `bookmarks.html` - 书签管理界面
- `search.html` - 搜索和过滤界面
- `memos.html` - 备忘录管理界面
- `categories.html` - 分类管理界面

## 技术栈

- HTML5 + CSS3 + JavaScript (ES6+)
- Tailwind CSS (CDN)
- FontAwesome (CDN)
- 响应式设计

## 使用方法

1. 直接在浏览器中打开任意HTML文件
2. 或使用本地服务器：
   ```bash
   python -m http.server 8000 --directory prd
   ```
3. 访问 http://localhost:8000

## 设计原则

- 极简主义：无复杂依赖，即开即用
- 响应式：支持320px-1920px所有设备
- 高保真：使用真实数据和图片
- 统一风格：简约、圆角、卡片式布局

## 加载性能目标

- 本地文件加载时间 < 2秒
- 图片懒加载优化
- CDN资源加速
