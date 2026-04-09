# Summer Beach Snake Game

一个夏日海滩主题的单人贪吃蛇小游戏（HTML/CSS/JavaScript）。在画布上操控小蛇收集西瓜与零食，分数越高速度越快，并支持最高分本地保存。

## 核心特性

- 纯前端：Canvas 渲染，无框架依赖
- 玩法：收集食物增长；撞墙/撞到自己则结束
- 进度：每收集一定数量会加速（难度递增）
- 记录：分数与最高分（LocalStorage）
- 视觉：海滩配色 + 气泡/海浪/太阳等动效

## 玩法

1. Open `index.html` in any modern web browser
2. Click "Start Game" to begin
3. Use the arrow keys to control your beach snake:
   - ↑ Up Arrow - Move up
   - ↓ Down Arrow - Move down
   - ← Left Arrow - Move left
   - → Right Arrow - Move right
4. Collect watermelon slices to grow your snake
5. Avoid hitting the walls or yourself
6. Try to beat your high score

## 规则与实现（简要）

- 计分：每个食物 +1；速度随进度提升
- 结束条件：撞墙或撞到自己
- 渲染：Canvas；最高分存储：LocalStorage

## 支付 API 后端

仓库内包含一个轻量的 Express 后端，用于演示/承载支付流程（也可供其他客户端复用）。

### Quick start

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动 API（默认端口 `3001`）：
   ```bash
   npm run start
   ```

### 接口列表

- `POST /api/payments` — 创建支付单：`amount`(number), `currency`(3-letter), `method`(string) → 返回 `paymentId`, `clientSecret`, status, timestamp
- `GET /api/payments/:id` — 查询支付单状态
- `POST /api/payments/:id/confirm` — 确认支付：模拟处理并标记为 `succeeded`
- `POST /api/payments/webhook` — 接收外部回调：`paymentId`, `status`(`succeeded|failed|requires_action|canceled`), 可选 `providerReference`

说明：当前使用内存存储（演示用途）；如需生产使用请替换为持久化存储与真实支付网关。
