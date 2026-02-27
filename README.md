# Campus Lite PWA Blueprint

本项目是一份HTML5毕业设计，展示如何用 PWA 技术实现大学生校园轻量网页应用。

## 1. 项目目标

- App Shell 架构：HTML/CSS 先渲染可交互骨架，JS 异步拉取数据。
- 离线机制：Service Worker 预缓存 + 差异化缓存策略。
- 模拟登录注册：常驻账号入口 + 首次访问登录提示弹窗。
- 交互校园地图：多区域切换、状态联动与动画反馈。
- 二级服务页面：
  - 图书馆座位中心（实时余量、预约/签到/取消联动）
  - 快递中心（筛选、预约取件、取件码、状态流转）
  - 校车到站中心（路线规划、站点 ETA 刷新、收藏线路）
- 常用服务工作台（可用化）：
  - 成绩查询、考试安排、空教室查询、奖学金通知、校园巴士、失物招领
- 数据看板：
  - 近 7 天模块活跃度与访问趋势
  - Lighthouse 对比数据录入（传统页/PWA 首访/PWA 复访）
  - 对比图与改进比例自动生成
- 数据持久化：
  - IndexedDB：缓存校园新闻（非结构化列表数据）。
  - LocalStorage：保存个性化配置（课表背景、地图默认区域、摘要显示）、模拟账号会话、待办事项。
- 性能评估：提供 Lighthouse 对比流程，比较传统网页与 PWA 在弱网下体验。

## 2. 目录结构

```text
campus-pwa-workspace/
├─ index.html
├─ offline.html
├─ manifest.webmanifest
├─ sw.js
├─ css/
│  └─ styles.css
├─ js/
│  ├─ app.js
│  ├─ db.js
│  └─ storage.js
├─ data/
│  └─ news.json
│  └─ campus-services.json
├─ icons/
│  ├─ icon-192.svg
│  └─ icon-512.svg
├─ benchmark/
│  └─ traditional.html
└─ docs/
   └─ performance-evaluation.md
   └─ graduation-design-review.md
```

## 3. 运行方式

> Service Worker 必须在 `http://localhost` 或 HTTPS 环境下测试。

1. 打开终端进入项目目录：

```powershell
cd "E:\campus-pwa-workspace"
```

2. 使用任意本地静态服务器启动（示例）：

```powershell
npx http-server -p 8080 -c-1
```

3. 浏览器访问：

- `http://localhost:8080/index.html` (PWA 版本)
- `http://localhost:8080/benchmark/traditional.html` (传统网页对照组)

## 4. 架构设计说明

### 4.1 App Shell

- `index.html + css/styles.css`：始终可快速呈现基础 UI（导航、卡片、课表、地图容器）。
- `js/app.js`：异步拉取数据后渲染新闻，避免白屏等待。

### 4.2 Service Worker 缓存策略

- 静态资源（HTML/CSS/JS/manifest/icon）：`Cache First`
- 业务数据（`/data/*.json`，含新闻与校园服务数据）：`Network First`
- 图片/地图类资源：`Stale While Revalidate`
- 页面导航请求：网络优先，失败时回退 `offline.html`

### 4.3 数据持久化

- `js/db.js`：封装 IndexedDB，支持新闻批量写入与读取。
- `js/storage.js`：封装 LocalStorage，保存用户个性化配置。

### 4.4 图书馆双模式数据源（模拟 / REST API）

- 页面入口：图书馆座位中心中的“数据源配置（第 1 项）”
- 模式说明：
  - `模拟数据（本地）`：完全离线可用，适合演示与答辩。
  - `REST API（联调）`：尝试请求后端接口，失败时自动降级到模拟数据并提示。
- 建议 API 约定：
  - `GET /library/realtime?dateMode=today&slot=14:00-16:00`
  - `GET /library/bookings`
  - `POST /library/bookings`
  - `PATCH /library/bookings/{id}`

## 5. 可个性化改造建议

- 将 `data/news.json` 换为你自己的后端 API。
- 将课表与地图模块对接学校实际业务系统。
- 替换图标与视觉风格，统一为你的毕设主题。
- 增加消息推送、后台同步、版本更新提示等 PWA 能力。

## 6. 性能评估

见 `docs/performance-evaluation.md`。

## 7. 毕设评估

见 `docs/graduation-design-review.md`，包含：
- 内容充实度、创新度、可用度、工程完整度评估；
- 当前已完善项与仍可提升项；
- 答辩优先补齐建议。

图表与对比数据补齐建议见 `docs/visualization-and-comparison-plan.md`。

## 8. 本地验证

```powershell
cd "E:\campus-pwa-workspace"
node --check .\js\app.js
node --check .\js\db.js
node --check .\js\storage.js
npx http-server -p 8080 -c-1
```
