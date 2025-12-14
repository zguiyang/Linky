## MODIFIED Requirements

### Requirement: 原型页面导航结构

系统 SHALL 提供清晰的原型页面导航结构，书签页面作为主要入口点。

#### Scenario: 用户访问首页
- **WHEN** 用户访问根路径
- **THEN** 显示书签页面内容
- **AND** 页面标题为"Linky - 书签管理"

#### Scenario: 用户在书签页面
- **WHEN** 用户在书签页面
- **THEN** 可以访问所有其他功能页面
- **AND** 导航菜单反映当前的页面层次结构

## REMOVED Requirements

### Requirement: 独立搜索页面
**Reason**: 功能被全局搜索取代，提供更好的用户体验
**Migration**: 搜索功能整合到全局 command dialog 中

#### Scenario: 用户访问搜索页面
- **REMOVED** 原有的独立搜索页面访问方式

### Requirement: 首页落地页
**Reason**: 简化用户流程，直接进入核心功能
**Migration**: 首页重定向到书签页面

#### Scenario: 用户访问首页
- **REMOVED** 原有的介绍性落地页

## ADDED Requirements

### Requirement: 全局命令对话框

系统 SHALL 提供全局命令对话框功能，支持快速搜索和导航。

#### Scenario: 用户触发全局搜索
- **WHEN** 用户按下 Cmd/Ctrl + K
- **THEN** 显示全局搜索对话框
- **AND** 输入框自动获得焦点
- **AND** 显示搜索历史和快速操作选项

#### Scenario: 用户执行搜索
- **WHEN** 用户在全局搜索中输入关键词
- **THEN** 实时显示匹配的书签、分类和笔记
- **AND** 结果按相关性排序
- **AND** 支持键盘导航选择结果

#### Scenario: 用户快速导航
- **WHEN** 用户在全局搜索中选择结果
- **THEN** 直接导航到对应的页面或内容
- **AND** 关闭搜索对话框
- **AND** 记录搜索历史

#### Scenario: 用户访问命令面板
- **WHEN** 用户点击导航栏的搜索按钮
- **THEN** 显示全局搜索对话框
- **AND** 显示可用的命令和快捷方式

### Requirement: 搜索结果分类

系统 SHALL 在全局搜索中提供分类的搜索结果。

#### Scenario: 搜索结果显示
- **WHEN** 搜索完成
- **THEN** 结果按类型分组显示（书签、分类、笔记）
- **AND** 每个组显示前 3 个最相关结果
- **AND** 提供查看更多结果的选项

### Requirement: 键盘快捷键支持

系统 SHALL 支持丰富的键盘快捷键操作。

#### Scenario: 键盘导航搜索结果
- **WHEN** 搜索对话框打开
- **THEN** 用户可以使用上下箭头导航结果
- **AND** 使用 Enter 选择结果
- **AND** 使用 Escape 关闭对话框
- **AND** 使用 Tab 在不同结果类型间切换