# Apple 设计风格规范

## ADDED Requirements

### Requirement: 应用 Apple 视觉设计系统

#### Scenario: 使用系统级色彩方案
**Given** 重新设计原型界面
**When** 定义颜色系统
**Then** 应使用系统级颜色：
- 主色：system blue (#007AFF)
- 成功：system green (#34C759)
- 警告：system orange (#FF9500)
- 错误：system red (#FF3B30)
- 中性色：从 gray-50 到 gray-900 的完整色阶
**And** 所有颜色应支持深色模式变体

#### Scenario: 统一图标风格
**Given** 界面需要图标
**When** 选择图标方案
**Then** 应使用 SF Symbols 或 Lucide Icons
**And** 图标应统一使用 24px 尺寸
**And** 支持 outline 和 filled 两种样式
**And** 确保图标的语义清晰

#### Scenario: 实现系统级字体规范
**Given** 定义文字样式
**When** 设置排版
**Then** 应使用系统字体栈：-apple-system, BlinkMacSystemFont, "Segoe UI"
**And** 标题使用较大字重（semibold 或 bold）
**And** 正文使用 regular 字重
**And** 保持适当的行高（1.5）

### Requirement: 实现 Apple 布局和间距系统

#### Scenario: 应用 8px 网格系统
**Given** 设计页面布局
**When** 设置元素间距
**Then** 所有间距应为 8px 的倍数
**And** 内容区域的内边距为 24px（移动端）和 32px（桌面端）
**And** 组件之间的间距为 16px

#### Scenario: 统一圆角规范
**Given** 设计界面元素
**When** 应用圆角
**Then** 按钮和输入框使用 8px 圆角
**And** 卡片使用 12px 圆角
**And** 大容器使用 16px 圆角
**And** 对话框使用 20px 圆角

#### Scenario: 实现合理的阴影层级
**Given** 界面元素需要层次
**When** 添加阴影效果
**Then** 使用微妙的阴影：
- 一级元素：shadow-sm (0 1px 2px)
- 二级元素：shadow-md (0 4px 6px)
- 浮动元素：shadow-lg (0 10px 15px)
- 对话框：shadow-2xl (0 25px 50px)

### Requirement: 实现 Apple 风格的交互动效

#### Scenario: 标准过渡动画
**Given** 元素状态变化
**When** 应用过渡效果
**Then** 使用标准时长：
- 快速交互：0.15s
- 标准交互：0.2s
- 复杂交互：0.3s
**And** 使用贝塞尔曲线：cubic-bezier(0.4, 0, 0.2, 1)

#### Scenario: 弹性动画效果
**Given** 需要强调的交互
**When** 用户点击或悬停
**Then** 可使用弹性动画
**And** 时长不超过 0.5s
**And** 避免过度使用

#### Scenario: 页面转场效果
**Given** 页面切换
**When** 导航到新页面
**Then** 使用淡入淡出效果
**And** 时长 0.2s
**And** 保持性能流畅

### Requirement: 实现响应式设计规范

#### Scenario: 移动端适配
**Given** 在移动设备上显示
**When** 调整布局
**Then** 导航栏应转换为汉堡菜单
**And** 触摸目标最小 44px
**And** 文字大小不小于 16px
**And** 保持足够的点击间距

#### Scenario: 平板端优化
**Given** 在平板设备上显示
**When** 调整布局
**Then** 利用额外空间显示更多信息
**And** 保持布局平衡
**And** 考虑横竖屏切换