# 原型重设计技术设计

## 设计原则

### Apple Design System

1. **简洁性**
   - 去除不必要的装饰元素
   - 使用大量留白
   - 突出核心功能

2. **层次结构**
   - 清晰的视觉层次
   - 合适的字体大小和权重
   - 统一的间距系统

3. **一致性**
   - 统一的交互模式
   - 一致的动画时长（0.2s, 0.3s, 0.5s）
   - 统一的圆角（8px, 12px, 16px）

### shadcn-ui 风格借鉴

1. **组件设计**
   - 微妙的边框（1px solid border-gray-200）
   - 柔和的阴影（shadow-sm, shadow-md）
   - 优雅的悬停效果

2. **颜色系统**
   - 主色调：使用系统蓝色
   - 中性色：gray-50 到 gray-900
   - 语义色：success, warning, error

## 技术实现

### 1. 全局搜索命令面板

```html
<!-- 命令面板结构 - 内联在 HTML 中 -->
<div id="command-palette" class="fixed inset-0 z-[100] hidden">
  <div class="fixed inset-0 bg-black/20 backdrop-blur-sm"></div>
  <div class="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl">
    <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- 搜索输入 -->
      <input type="text" placeholder="搜索书签、备忘录..." />
      <!-- 搜索结果 -->
      <div class="max-h-96 overflow-y-auto"></div>
    </div>
  </div>
</div>

<script>
// 内联 JavaScript 实现搜索功能
document.addEventListener('keydown', function(e) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggleCommandPalette();
  }
});
</script>
```

### 2. 使用在线资源

```html
<!-- Unsplash 图片 -->
<img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop" alt="示例图片" />

<!-- FontAwesome 图标 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
<i class="fas fa-bookmark"></i>
```

### 3. 响应式断点

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### 4. 动画规范

```css
/* 内联在 HTML 中 */
<style>
  .transition-standard {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .transition-bounce {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
</style>
```

## 文件结构

保持简单、扁平的结构：

```
/prd
├── index.html          # 主页面（集成搜索功能）
├── bookmarks.html      # 书签管理
├── memos.html         # 备忘录管理
├── categories.html    # 分类管理
├── template.html      # 组件模板参考
└── README.md          # 说明文档
```

## 性能优化

1. **图片加载优化**
   - 使用可靠的 Unsplash CDN 链接
   - 添加 loading="lazy" 属性
   - 实现优雅的占位符

2. **代码组织**
   - 在 HTML 中使用内联 CSS 和 JavaScript
   - 使用 Tailwind CSS CDN
   - 保持代码的可读性和可维护性

3. **缓存策略**
   - 利用 CDN 的缓存机制
   - 使用稳定的资源版本链接