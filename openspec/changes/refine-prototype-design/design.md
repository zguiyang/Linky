# 设计规范 - 苹果式单色美学

## 设计哲学

### 核心原则
1. **少即是多** - 每个元素都有其存在的必要
2. **功能优先** - 设计服务于功能，而非装饰
3. **单色美学** - 黑白灰为主，蓝色点缀
4. **永恒设计** - 不会过时的经典风格

## 视觉设计系统

### 1. 色彩系统

#### 深色主题（默认）
```css
/* 背景层级 */
--background: #000000;         /* 纯黑 - 主背景 */
--surface: #1C1C1E;            /* 深灰 - 卡片背景 */
--surface-secondary: #2C2C2E;  /* 中灰 - 悬停状态 */
--surface-tertiary: #3A3A3C;   /* 浅灰 - 分隔区域 */

/* 边框和分隔 */
--border: rgba(255, 255, 255, 0.08);      /* 极淡边框 */
--border-strong: rgba(255, 255, 255, 0.15); /* 强调边框 */
--separator: rgba(255, 255, 255, 0.12);    /* 分隔线 */

/* 文本层级 */
--foreground: #FFFFFF;         /* 纯白 - 主文本 */
--foreground-secondary: #EBEBF5; /* 95%白 - 次级文本 */
--foreground-muted: #8E8E93;   /* 60%白 - 辅助文本 */
--foreground-dimmed: #636366;  /* 40%白 - 弱化文本 */

/* 功能色 - 苹果标准 */
--primary: #007AFF;            /* 系统蓝 */
--primary-hover: #409CFF;      /* 悬停蓝 */
--success: #34C759;            /* 成功绿 */
--warning: #FF9500;            /* 警告橙 */
--error: #FF3B30;              /* 错误红 */
```

#### 亮色主题
```css
/* 背景层级 */
--background: #FFFFFF;         /* 纯白 - 主背景 */
--surface: #F2F2F7;            /* 极浅灰 - 卡片背景 */
--surface-secondary: #E5E5EA;  /* 浅灰 - 悬停状态 */
--surface-tertiary: #D1D1D6;   /* 中灰 - 分隔区域 */

/* 边框和分隔 */
--border: rgba(0, 0, 0, 0.08);           /* 极淡边框 */
--border-strong: rgba(0, 0, 0, 0.15);    /* 强调边框 */
--separator: rgba(60, 60, 67, 0.12);     /* 分隔线 */

/* 文本层级 */
--foreground: #000000;         /* 纯黑 - 主文本 */
--foreground-secondary: #3C3C43; /* 深灰 - 次级文本 */
--foreground-muted: #8E8E93;   /* 中灰 - 辅助文本 */
--foreground-dimmed: #C7C7CC;  /* 浅灰 - 弱化文本 */

/* 功能色保持一致 */
```

### 2. 字体系统

#### 苹果系统字体栈
```css
font-family: -apple-system, BlinkMacSystemFont,
             "SF Pro Display", "SF Pro Text",
             system-ui, sans-serif;
```

#### 字体比例
```css
/* 标题层级 */
--text-3xl: 30px;  /* 大标题 */
--text-2xl: 24px;  /* 标题 */
--text-xl: 20px;   /* 副标题 */
--text-lg: 18px;   /* 大正文 */
--text-base: 16px; /* 正文 */
--text-sm: 14px;   /* 小正文 */
--text-xs: 12px;   /* 说明文字 */

/* 字重 */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 3. 间距系统

基于 8px 网格系统，遵循苹果的间距规范
```css
--space-1: 4px;    /* 极小间距 */
--space-2: 8px;    /* 小间距 */
--space-3: 12px;   /* 默认间距 */
--space-4: 16px;   /* 常用间距 */
--space-5: 20px;   /* 大间距 */
--space-6: 24px;   /* 很大间距 */
--space-8: 32px;   /* 特大间距 */
```

### 4. 阴影系统

极简的阴影，仅用于区分层次
```css
/* 默认无阴影，保持纯净 */
/* 悬停时使用极淡阴影 */
--shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
--shadow-modal: 0 8px 24px rgba(0, 0, 0, 0.2);
```

### 5. 圆角系统

苹果风格的圆角
```css
--radius-sm: 4px;   /* 小元素 */
--radius-md: 8px;   /* 按钮、输入框 */
--radius-lg: 12px;  /* 卡片 */
--radius-xl: 16px;  /* 弹窗 */
```

## 布局设计

### 1. 整体布局

#### bookmarks.html - 主应用
```
┌─────────────────────────────────────────┐
│              Search Bar (56px)          │
├─────────┬───────────────────────────────┤
│         │                               │
│ Sidebar │         Main Content          │
│  260px  │                               │
│         │                               │
│ - All   │  ┌─────────────────────────┐  │
│         │  │ Card                    │  │
│ Links   │  └─────────────────────────┘  │
│         │                               │
│ Tags    │  ┌─────────────────────────┐  │
│         │  │ Card                    │  │
└─────────┴───────────────────────────────┘
```

#### index.html - 入口页
```
┌─────────────────────────────────────────┐
│                                         │
│              Linky                      │
│         智能书签管理工具                  │
│                                         │
│          [ 进入应用 ]                    │
│                                         │
└─────────────────────────────────────────┘
```

### 2. 组件设计

#### 搜索栏
- 高度：40px
- 圆角：8px
- 背景色：surface
- 边框：1px border
- 占位符：foreground-dimmed
- 图标：foreground-muted

#### 侧边栏
- 宽度：260px（固定）
- 背景：background
- 导航项高度：40px
- 激活状态：左侧 2px 蓝色边框 + primary-light 背景
- 图标：16px，左对齐
- 文字：text-sm，medium 字重

#### 内容卡片
- 背景：surface
- 边框：1px border
- 圆角：12px
- 内边距：16px
- 悬停：surface-secondary 背景
- 网站图标：32px
- 标题：text-base，semibold
- 描述：text-sm，foreground-secondary
- 标签：text-xs，高度 24px

#### 按钮设计
- 主要按钮：primary 背景色，白色文字
- 次要按钮：surface 背景，primary 文字
- 图标按钮：transparent 背景，foreground 文字
- 高度：36px（小）、40px（默认）
- 圆角：8px
- 过渡：150ms ease-out

## 交互设计

### 1. 动画原则

#### 即时响应
- 所有交互立即反馈（50ms 内）
- 无延迟的视觉变化
- 流畅的状态转换

#### 微妙动画
- 不使用夸张的动画效果
- 透明度和位置微调
- 快速完成（150-250ms）

#### 动画缓动
```css
/* 苹果标准缓动 */
ease-out: cubic-bezier(0.16, 1, 0.3, 1)
ease-in: cubic-bezier(0.7, 0, 0.84, 0)
```

### 2. 状态反馈

#### 悬停状态
- 背景色变化
- 边框加深
- 轻微的阴影（如必要）

#### 激活状态
- 颜色加深
- 轻微缩放（98%）
- 即时恢复

#### 焦点状态
- 蓝色轮廓（2px，半透明）
- 不改变其他样式

### 3. 加载状态

#### 骨架屏
- 使用 surface-secondary 颜色
- 动画：渐变移动（1.5s 循环）
- 保持内容布局

#### 加载指示器
- 简单的旋转动画
- 使用 primary 颜色
- 尺寸适中（16px）

## 响应式设计

### 断点设置
- 桌面：≥ 1024px（双栏布局）
- 平板：768px - 1023px（收缩侧边栏）
- 移动：< 768px（单栏布局）

### 适配策略

#### 平板端
- 侧边栏收缩至 200px
- 图标 + 文字保持
- 卡片列数减少

#### 移动端
- 隐藏侧边栏，转为抽屉
- 全宽卡片布局
- 触摸友好的尺寸（44px 最小点击区域）

## 可访问性

### 1. 颜色对比
- 所有文本对比度 ≥ 4.5:1
- 大文本对比度 ≥ 3:1
- 交互元素有明确的焦点指示

### 2. 键盘导航
- Tab 顺序合理
- 所有交互元素可聚焦
- 跳过链接支持

### 3. 屏幕阅读器
- 语义化 HTML 结构
- 合适的 ARIA 标签
- 图标有文字说明

## 性能优化

### 1. 资源优化
- 最小化资源使用
- 图片懒加载
- CSS 和 JavaScript 内联

### 2. 渲染优化
- 使用 transform 而非 position 动画
- 避免重排和重绘
- 合理使用 will-change

### 3. 交互优化
- 防抖处理（搜索输入）
- 虚拟滚动（大量数据）
- 预加载关键资源