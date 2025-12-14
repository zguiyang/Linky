# 重新设计界面规范

## ADDED Requirements

### Requirement: Implement Apple-style Monochromatic Design System
The system SHALL apply Apple's "less is more" design philosophy to create an interface focused on functionality.

#### Scenario: Apply Monochromatic Design to All Interface Elements
- **WHEN** viewing any interface element
- **THEN** the interface SHALL use 90% black/white tones and 10% blue accents
- **AND** the system SHALL distinguish visual hierarchy through brightness rather than color
- **AND** the system SHALL create a professional and timeless visual experience

**Acceptance Criteria:**
- 界面 SHALL 使用纯黑 (#000000) 或纯白 (#FFFFFF) 作为主背景
- 系统 SHALL 仅使用苹果系统蓝 (#007AFF) 作为主交互色
- 文本 SHALL 使用 4 个明度层级 (100%, 95%, 60%, 40%)
- 表面元素 SHALL 使用 3-4 个灰度层级
- 所有动画 SHALL 保持克制和快速 (150ms 以内)

#### Scenario: Implement Dark Theme as Default
- **WHEN** a user visits the application for the first time
- **THEN** the application SHALL display the dark theme by default
- **AND** theme switching functionality SHALL be available when needed

**Acceptance Criteria:**
- 系统 SHALL 默认使用深色主题配色
- 主题切换按钮 SHALL 位于设置区域
- 主题选择 SHALL 持久化保存
- 主题切换 SHALL 有平滑过渡效果

### Requirement: Simplify Architecture to Dual-Page Mode
The system SHALL simplify the complex multi-page architecture to a minimal dual-page mode to enhance user experience.

#### Scenario: Restructure to Entry Page and Main Application
- **WHEN** a user performs any operation
- **THEN** the system SHALL ensure all functions can be completed within two pages
- **AND** the user SHALL not need to navigate between multiple pages

**Acceptance Criteria:**
- 系统 SHALL 仅保留 index.html 作为登录/入口页面
- 系统 SHALL 将所有核心功能整合到 bookmarks.html
- 系统 SHALL 删除 categories.html、memos.html、search.html
- 系统 SHALL 通过 SPA 方式实现页面切换

#### Scenario: Integrate All Functions into Main Application
- **WHEN** a user needs to access different functions
- **THEN** the system SHALL provide sidebar navigation for quick switching
- **AND** all content SHALL be displayed in a unified interface

**Acceptance Criteria:**
- 侧边栏 SHALL 使用 260px 固定宽度
- 侧边栏 SHALL 包含：All、Links、Files、Notes、Tags 导航项
- 主内容区 SHALL 根据选择动态展示对应内容
- 系统 SHALL 提供右键菜单快捷操作

## MODIFIED Requirements

### Requirement: Optimize Global Search Functionality
The system SHALL transform search functionality from a separate page to a global command palette for improved efficiency.

#### Scenario: Implement Global Command Palette
- **WHEN** a user presses ⌘K (or Ctrl+K) on any interface
- **THEN** the system SHALL immediately pop up the global search command palette
- **AND** the user SHALL be able to search all types of bookmarks and memos

**Acceptance Criteria:** [原有]
- 命令面板 SHALL 居中显示，最大宽度 560px
- 系统 SHALL 支持模糊搜索和实时结果
- 系统 SHALL 提供键盘导航（上下箭头、Enter、Esc）
- 搜索结果 SHALL 高亮匹配文本

**Modified Acceptance Criteria:**
- 命令面板 SHALL 使用深色背景，保持与主题一致
- 系统 SHALL 不使用背景模糊效果，保持性能
- 搜索结果 SHALL 使用极简设计
- 快捷键提示 SHALL 使用次要文本色

#### Scenario: Optimize Search Results Display
- **WHEN** a user types content in the search box and the search is executed
- **THEN** the system SHALL sort results by relevance
- **AND** each result item SHALL display core information

**Acceptance Criteria:**
[原有] 显示标题、描述、标签、路径

**Modified Acceptance Criteria:**
- 系统 SHALL 仅显示：图标 + 标题 + 标签
- 系统 SHALL 省略描述以保持简洁
- 系统 SHALL 使用单行布局
- 系统 SHALL 在鼠标悬停时显示完整信息

## DELETED Requirements

### Requirement: Standalone Category Management Page
Remove the standalone category management page and integrate category functionality into the sidebar navigation.

#### Scenario: Remove Standalone Category Management
- **BEFORE** a user accesses categories.html to manage categories
- **AFTER** category management functionality is integrated into sidebar navigation

**删除原因:**
- 分类作为导航过滤器更直观
- 减少页面跳转
- 符合单页面应用理念

### Requirement: Standalone Memo Management Page
Remove the standalone memo management page and manage memos as a special type of bookmark.

#### Scenario: Remove Standalone Memo Management
- **BEFORE** a user accesses memos.html to manage memos
- **AFTER** memos are managed as a special type of bookmark

**删除原因:**
- 备忘录和书签本质相似
- 统一管理更高效
- 标签系统可满足分类需求

### Requirement: Standalone Search Page
Remove the standalone search page and provide more efficient search experience through the global command palette.

#### Scenario: Remove Standalone Search Page
- **BEFORE** a user accesses search.html to perform searches
- **AFTER** search functionality is implemented through the global command palette

**删除原因:**
- 命令面板更高效
- 避免页面切换
- 符合现代应用交互模式

## Cross-Reference Requirements

### Related to: Data Management (data-structure.spec)
- 数据结构需要统一以支持界面整合
- 标签系统需要增强以替代分类功能
- 搜索索引需要优化以支持全局搜索

### Related to: Performance Optimization (performance.spec)
- 单页面架构需要优化加载性能
- 大量数据时需要虚拟滚动
- 搜索功能需要防抖优化

### Related to: User Experience (interaction.spec)
- 交互模式需要适应新架构
- 快捷键系统需要完善
- 响应式设计需要更新