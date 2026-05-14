# 诗境山水小程序前端对接说明

## 工程状态
- 前端已完成 UI、任务提交与任务状态轮询逻辑。
- 当前默认处于 Mock 数据模式（USE_MOCK=true），可直接在小程序中体验流程。

## 联调前配置
1. 打开 utils/config.js。
2. 将 ENV 改为 dev。
3. 设置 BASE_URL 为后端真实服务地址，例如 http://127.0.0.1:5000。
4. 前端页面未硬编码后端地址，统一从 BASE_URL 拼接。

## 核心接口契约

### 1) 提交以诗入画任务
- POST /api/generate/poem
- 请求体：
```json
{ "poem": "..." }
```
- 返回 data：
```json
{ "task_id": "...", "status": "queued|running|succeeded|failed" }
```

### 2) 提交文脉生画任务
- POST /api/generate/painting
- 请求体：
```json
{ "history": "...", "content": "...", "mood": "...", "poem": "..." }
```
- 说明：这四个入参对应 backend_reference/test_model.py 中 generate_image_from_api 的提示词拼接逻辑：
```text
prompt = f"{history} {content} {mood} {poem}".strip()
```
- 返回 data：
```json
{ "task_id": "...", "status": "queued|running|succeeded|failed" }
```

### 3) 查询任务状态
- GET /api/tasks/{task_id}
- 前端每 2 秒轮询一次。
- 返回 data：
```json
{
  "task_id": "...",
  "status": "queued|running|succeeded|failed",
  "progress": 0,
  "type": "poem|painting",
  "result": { "image_url": "..." },
  "error_message": null
}
```
- 当 status = succeeded 时，result.image_url 必须有值。

## 响应体格式（强制）
所有接口必须返回：
```json
{ "code": 0, "message": "ok", "data": { "...": "..." } }
```
否则前端 utils/request.js 的拦截会报错。
