# 设计规范与技术方案

## 设计理念

### 核心原则
1. **工具优先** - 设计服务于功能，帮助用户高效管理书签
2. **克制而精致** - 每个设计元素都有其目的，不过度装饰
3. **耐看易用** - 经久耐看的视觉风格，不会让用户分心
4. **直觉式交互** - 遵循 Apple HIG，让用户凭直觉就能使用

### 设计语言
- **克制极简**：适当的留白，清晰的层次，避免过度设计
- **微妙的质感**：细腻的阴影、柔和的圆角、恰到好处的留白
- **功能性色彩**：仅使用必要的颜色来区分和引导
- **专业中性**：中性的色调，让内容成为主角

## 视觉设计系统

### 1. 色彩方案 - 苹果式单色美学

#### 主色调 - 深色主题（默认）
```css
:root {
  /* 苹果式深色系统 - 纯粹的黑灰白 */
  --background: #000000;                     /* 纯黑背景 */
  --surface: #1C1C1E;                        /* 表面 - 苹果深灰 */
  --surface-secondary: #2C2C2E;              /* 次级表面 */
  --surface-tertiary: #3A3A3C;               /* 三级表面 */
  --border: rgba(255, 255, 255, 0.08);       /* 极淡边框 */
  --border-strong: rgba(255, 255, 255, 0.15); /* 强调边框 */
  --separator: rgba(255, 255, 255, 0.12);    /* 分隔线 */

  /* 文本系统 - 苹果式灰度 */
  --foreground: #FFFFFF;                     /* 主文本 */
  --foreground-secondary: #EBEBF5;           /* 次级文本 */
  --foreground-muted: #8E8E93;               /* 静音文本 */
  --foreground-dimmed: #636366;              /* 弱化文本 */
  --foreground-quaternary: #48484A;          /* 四级文本 */

  /* 主色系统 - 蓝色（苹果的标准主色）*/
  --primary: #0A84FF;                        /* 系统蓝 - 苹果标准 */
  --primary-hover: #409CFF;                  /* 悬停状态 */
  --primary-active: #007AFF;                 /* 激活状态 */
  --primary-light: rgba(10, 132, 255, 0.1);   /* 浅色背景 */
  --primary-lighter: rgba(10, 132, 255, 0.05); /* 更浅背景 */

  /* 语义色系统 - 苹果标准 */
  --success: #30D158;                        /* 成功 - 苹果绿 */
  --warning: #FF9F0A;                       /* 警告 - 苹果橙 */
  --error: #FF453A;                         /* 错误 - 苹果红 */
  --info: #5E5CE6;                          /* 信息 - 苹果紫 */

  /* 系统状态色 */
  --background-secondary: rgba(255, 255, 255, 0.05);
  --background-tertiary: rgba(255, 255, 255, 0.03);
  --fill-primary: rgba(255, 255, 255, 0.18);
  --fill-secondary: rgba(255, 255, 255, 0.12);
  --fill-tertiary: rgba(255, 255, 255, 0.08);
}
```

#### 亮色主题 - 苹果浅色模式
```css
[data-theme="light"] {
  /* 苹果式浅色系统 */
  --background: #FFFFFF;                     /* 纯白背景 */
  --surface: #F2F2F7;                        /* 表面 - 苹果浅灰 */
  --surface-secondary: #E5E5EA;              /* 次级表面 */
  --surface-tertiary: #D1D1D6;               /* 三级表面 */
  --border: rgba(0, 0, 0, 0.08);             /* 极淡边框 */
  --border-strong: rgba(0, 0, 0, 0.15);      /* 强调边框 */
  --separator: rgba(60, 60, 67, 0.12);       /* 分隔线 */

  /* 文本系统 */
  --foreground: #000000;                     /* 主文本 */
  --foreground-secondary: #3C3C43;           /* 次级文本 */
  --foreground-muted: #8E8E93;               /* 静音文本 */
  --foreground-dimmed: #C7C7CC;              /* 弱化文本 */
  --foreground-quaternary: #E5E5EA;          /* 四级文本 */

  /* 主色保持一致 */
  --primary: #007AFF;                        /* 系统蓝 */
  --primary-hover: #409CFF;
  --primary-active: #0051D5;
  --primary-light: rgba(0, 122, 255, 0.08);
  --primary-lighter: rgba(0, 122, 255, 0.04);

  /* 语义色保持一致 */
  --success: #34C759;
  --warning: #FF9500;
  --error: #FF3B30;
  --info: #5856D6;

  /* 系统状态色 */
  --background-secondary: rgba(0, 0, 0, 0.03);
  --background-tertiary: rgba(0, 0, 0, 0.01);
  --fill-primary: rgba(0, 0, 0, 0.18);
  --fill-secondary: rgba(0, 0, 0, 0.12);
  --fill-tertiary: rgba(0, 0, 0, 0.08);
}
```

#### 设计理念
- **单色美学**：仅使用黑、白、灰，偶尔点缀系统蓝
- **苹果标准**：完全遵循 Apple Human Interface Guidelines 的色彩规范
- **克制之美**：最少的颜色，最大的视觉冲击力
- **永恒设计**：不会过时的经典配色

### 2. 色彩使用原则

#### 单色为主，彩色为辅
- 90% 使用灰度色彩（黑、白、灰）
- 10% 使用彩色点缀（仅在必要时）
- 主色（蓝色）仅用于关键交互

#### 层次通过明度区分
- 不使用不同颜色，而是使用不同明度
- 深色背景：从 #000000 到 #3A3A3C
- 亮色背景：从 #FFFFFF 到 #D1D1D6
- 文本：4 个层级，明度递减

#### 语义色最小化
- 仅在需要时显示（成功/错误提示）
- 保持苹果的标准色值
- 不创造新的颜色

### 2. 字体系统

#### 苹果系统字体栈
```css
font-family: -apple-system, BlinkMacSystemFont,
             "SF Pro Display", "SF Pro Text",
             system-ui, sans-serif;
```

#### 字体比例
```css
--font-size-micro: 0.75rem;    /* 12px */
--font-size-xs: 0.875rem;      /* 14px */
--font-size-sm: 1rem;          /* 16px */
--font-size-base: 1.125rem;    /* 18px */
--font-size-lg: 1.25rem;       /* 20px */
--font-size-xl: 1.5rem;        /* 24px */
--font-size-2xl: 2rem;         /* 32px */
--font-size-3xl: 2.5rem;       /* 40px */
--font-size-4xl: 3rem;         /* 48px */
```

#### 字重系统
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### 3. 间距系统

基于 8px 网格系统
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### 4. 阴影系统 - 微妙克制

```css
/* 极淡的阴影，用于区分层次 */
--shadow-xs: 0 1px 2px 0 hsl(0 0% 0% / 0.04);
--shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.06);
--shadow-base: 0 1px 3px 0 hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
--shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.06);
--shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.04);

/* 仅在必要时使用内阴影 */
--shadow-inner: inset 0 2px 4px 0 hsl(0 0% 0% / 0.02);

/* 主题适配的阴影 */
[data-theme="dark"] {
  --shadow-xs: 0 1px 2px 0 hsl(0 0% 0% / 0.2);
  --shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.3);
  --shadow-base: 0 1px 3px 0 hsl(0 0% 0% / 0.4), 0 1px 2px -1px hsl(0 0% 0% / 0.4);
}
```

### 5. 圆角系统 - Apple 风格

```css
--radius-xs: 0.125rem;   /* 2px - 细节元素 */
--radius-sm: 0.25rem;    /* 4px - 小按钮 */
--radius-base: 0.375rem; /* 6px - 默认按钮 */
--radius-md: 0.5rem;     /* 8px - 卡片 */
--radius-lg: 0.75rem;    /* 12px - 面板 */
--radius-xl: 1rem;       /* 16px - 弹窗 */
--radius-2xl: 1.25rem;   /* 20px - 特殊场景 */
--radius-full: 9999px;   /* 圆形元素 */
```

### 6. 动画系统 - 自然而不突兀

#### 缓动函数 - Apple 标准
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* 呼出效果 */
--ease-in: cubic-bezier(0.7, 0, 0.84, 0);       /* 呼入效果 */
--ease-in-out: cubic-bezier(0.45, 0, 0.55, 1);  /* 平滑过渡 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 仅用于必要反馈 */
```

#### 动画时长 - 快速响应
```css
--duration-instant: 50ms;    /* 瞬时反馈 */
--duration-fast: 150ms;      /* 快速过渡 */
--duration-normal: 250ms;    /* 标准动画 */
--duration-slow: 400ms;      /* 复杂动画 */
--duration-slower: 600ms;    /* 页面转场 */
```

#### 动画原则
- 响应式：用户操作后立即反馈
- 连贯性：动画之间衔接自然
- 含义明确：每个动画都有明确目的
- 适度使用：不滥用动画效果

## 组件设计规范

### 1. 卡片组件 - 简洁高效

#### 基础卡片
- 背景：纯色表面，不使用透明度
- 边框：1px solid hsl(var(--border)) - 极淡
- 圆角：8px（--radius-md）
- 阴影：--shadow-sm - 几乎不可见
- 悬停效果：边框加深，阴影变为 --shadow-base

#### 内容层次
```css
.card {
  background: hsl(var(--surface));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
  transition: all var(--duration-fast) var(--ease-out);
}

.card:hover {
  border-color: hsl(var(--border-strong));
  box-shadow: var(--shadow-base);
}
```

### 2. 导航设计 - 功能导向

#### 侧边栏
- 宽度：260px（固定，不收缩）
- 背景：纯色表面
- 导航项：文字为主，图标辅助
- 活跃状态：左侧 2px 边框 + 背景色轻微变化
- 分组：使用细线分隔，保持整洁

#### 顶部栏
- 高度：56px - 不占用太多空间
- 内容：搜索框居中，操作按钮靠右
- 无 Logo：节省空间，内容优先

### 3. 命令面板 - 高效搜索

#### 设计原则
- 全屏遮罩：半透明黑色背景
- 居中弹出：最大宽度 560px
- 圆角：12px（--radius-lg）
- 搜索框：无装饰，聚焦时显示轮廓
- 结果列表：清晰的单行布局
- 键盘导航：标准快捷键支持

#### 性能优先
- 无背景模糊效果（性能友好）
- 最小化动画
- 即时响应

### 4. 书签卡片 - 信息优先

#### 布局结构
```
┌─────────────────────────────┐
│ [图标] 标题                   │
│        描述文本（可选）        │
│        [标签1] [标签2]        │
└─────────────────────────────┘
```

#### 设计细节
- 网站图标：32x32px，左对齐
- 标题：16px，medium 字重
- 描述：14px，次要色，单行截断
- 标签：24px 高度，圆角 4px
- 操作：右键菜单，不显示额外按钮

#### 交互原则
- 悬停：边框变深，背景微调
- 点击：即时的选中状态
- 拖拽：半透明，保持性能

## 页面架构设计

### 1. bookmarks.html - 主应用页面

#### 布局结构 - 功能优先
```
┌─────────────────────────────────────────┐
│              Search Bar                 │
│         [   搜索所有内容...   ] [⌘K]     │
├─────────┬───────────────────────────────┤
│         │                               │
│ Sidebar │         Main Content          │
│  260px  │                               │
│         │                               │
│ [All]   │  ┌─────────────────────────┐  │
│         │  │ [favicon] 标题            │  │
│ Links   │  │         描述信息          │  │
│  (42)   │  │   [tag] [tag]           │  │
│         │  └─────────────────────────┘  │
│ Files   │                               │
│         │  ┌─────────────────────────┐  │
│ Notes   │  │ [favicon] 标题            │  │
│         │  │         描述信息          │  │
│ Tags    │  │   [tag] [tag]           │  │
│         │  └─────────────────────────┘  │
└─────────┴───────────────────────────────┘
```

#### 设计原则
- **无顶栏**：搜索区域即是顶部，最大化内容空间
- **固定侧栏**：260px 宽度，不收缩，稳定可靠
- **信息密度**：合理的间距，避免过度留白
- **清晰层级**：使用边框和背景区分层次

### 2. index.html - 极简入口页

#### 设计理念
类似 GitHub Pages 的简洁风格
- 居中的产品名称
- 一句话描述
- "进入应用" 按钮
- 纯色背景

#### 设计原则
- **功能性**：页面目的明确 - 进入应用
- **快速加载**：最小化资源使用
- **无装饰**：不使用不必要的动画或效果

## 交互设计 - 功能优先

### 1. 微交互 - 恰到好处

#### 按钮交互
```css
.button {
  transition: all var(--duration-fast) var(--ease-out);
}
.button:hover {
  background-color: hsl(var(--surface-secondary));
}
.button:active {
  transform: scale(0.98);
  transition-duration: var(--duration-instant);
}
```

#### 状态反馈
```css
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.loading {
  animation: pulse-subtle 1.5s ease-in-out infinite;
}
```

### 2. 页面转场 - 快速响应

#### 淡入效果
```css
.fade-in {
  opacity: 0;
  animation: fadeIn var(--duration-fast) var(--ease-out) forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
```

### 3. 反馈机制

#### 成功提示
- 使用绿色边框短暂闪烁
- 伴随对勾图标显示
- 2秒后自动消失

#### 错误提示
- 使用红色边框
- 错误信息出现在输入框下方
- 持续显示直到用户操作

## 性能优化策略 - 保持流畅

### 1. 资源优化
- **最小化资源**：只加载必要的内容
- **网站图标**：使用 Google Favicon API，按需获取
- **无背景图**：不使用大型背景图片
- **CSS 内联**：减少请求次数

### 2. 动画性能
- **硬件加速**：仅对必要元素使用 transform
- **避免重排**：使用 opacity 代替 visibility
- **简化动画**：不使用复杂的渐变或模糊效果
- **60fps 保证**：所有动画保持流畅

### 3. 交互优化
- **即时响应**：用户操作立即反馈
- **搜索防抖**：避免频繁触发
- **虚拟列表**：大量数据时保持性能

## 响应式设计

### 断点系统
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### 适配策略
- Mobile First：先设计移动端
- 渐进增强：添加桌面端特性
- 触摸友好：44px 最小点击区域
- 横屏适配：平板横屏优化

## 可访问性设计

### 1. 键盘导航
- Tab 键序列合理
- 焦点指示清晰
- 快捷键支持

### 2. 屏幕阅读器
- 语义化 HTML
- ARIA 标签
- 替代文本

### 3. 视觉辅助
- 高对比度模式
- 字体缩放支持
- 动画减少选项

## 技术实现细节

### 1. CSS 架构
```css
/* 1. Reset */
@layer reset { /* CSS Reset */ }

/* 2. Variables */
@layer variables { /* CSS Variables */ }

/* 3. Base */
@layer base { /* Base styles */ }

/* 4. Components */
@layer components { /* Component styles */ }

/* 5. Utilities */
@layer utilities { /* Utility classes */ }
```

### 2. JavaScript 模块化
```javascript
// 命令面板模块
class CommandPalette {
  // ...
}

// 主题切换模块
class ThemeManager {
  // ...
}

// 动画管理器
class AnimationManager {
  // ...
}
```

### 3. 性能监控
```javascript
// FPS 监控
const fps = new FPSMonitor();

// 交互延迟追踪
const interaction = new InteractionTracker();
```

## 质量保证

### 1. 视觉回归测试
- 截图对比
- 像素差异检测
- 多分辨率测试

### 2. 性能基准
- 首屏时间 < 2s
- 交互响应 < 100ms
- 动画帧率 > 55fps

### 3. 兼容性测试
- 主流浏览器支持
- iOS Safari 优化
- Android Chrome 优化