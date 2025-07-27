# 贪吃蛇游戏 (Snake Game)

一个现代化的贪吃蛇游戏，采用深色科技风格设计，支持桌面端和移动端。

## 特性

- 🎮 经典贪吃蛇游戏机制
- 🌙 深色科技风格界面
- 📱 完美的移动端适配
- 🎵 Web Audio API 音效系统
- 💾 本地存储高分记录
- ⌨️ 键盘和触摸双重控制
- 🎯 等级系统和速度递增
- ✨ 流畅的动画效果

## 技术栈

- **Next.js 14+** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Web Audio API** - 音效系统

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看游戏。

### 构建生产版本

```bash
npm run build
npm start
```

## 游戏控制

### 桌面端
- **方向键** 或 **WASD** - 控制蛇的移动
- **P** - 暂停/继续游戏
- **R** - 重新开始游戏
- **Enter** - 开始游戏/重新开始

### 移动端
- **触摸按钮** - 方向控制
- **滑动手势** - 控制蛇的移动方向
- **触摸控制面板** - 暂停和重新开始

## 游戏规则

1. 控制蛇吃掉食物来获得分数
2. 每吃一个食物，蛇身增长一节，分数增加10分
3. 每50分提升一个等级，游戏速度加快
4. 避免撞到边界或蛇身
5. 挑战更高的分数和等级！

## 项目结构

```
├── app/                    # Next.js App Router
├── components/             # React 组件
├── hooks/                  # 自定义 Hooks
├── services/              # 服务层
├── types/                 # TypeScript 类型定义
├── utils/                 # 工具函数
└── constants/             # 常量配置
```

## 开发说明

项目采用模块化架构，主要模块包括：

- **游戏逻辑** (`hooks/useGameLogic.ts`) - 核心游戏状态管理
- **控制系统** (`hooks/useKeyboardControls.ts`, `hooks/useTouchControls.ts`) - 输入处理
- **音效系统** (`services/AudioService.ts`) - Web Audio API 封装
- **存储系统** (`services/StorageService.ts`) - 本地存储管理
- **UI组件** (`components/`) - 游戏界面组件

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 许可证

MIT License