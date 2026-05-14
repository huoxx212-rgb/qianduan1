const apiTask = require('../../api/task')

Page({
  data: { taskId: '', statusText: '排队中，请稍候...', progress: 0, timer: null },
  onLoad(options) {
    if (options.taskId) {
      this.setData({ taskId: options.taskId })
      this.startPolling()
    }
  },
  onUnload() { this.clearTimer() },
  clearTimer() {
    if (this.data.timer) { clearInterval(this.data.timer); this.setData({ timer: null }) }
  },
  startPolling() {
    this.checkStatus()
    const timer = setInterval(() => { this.checkStatus() }, 2000)
    this.setData({ timer })
  },
  checkStatus() {
    apiTask.getTaskDetail(this.data.taskId).then(res => {
      const status = res.status
      this.setData({ progress: res.progress || 0 })
      if (status === 'queued') {
        this.setData({ statusText: '排队中，请稍候...' })
      } else if (status === 'running') {
        this.setData({ statusText: 'AI 正在理解诗词意境并生成山水画...' })
      } else if (status === 'succeeded') {
        this.clearTimer()
        this.setData({ statusText: '生成成功，即将跳转...' })
        setTimeout(() => { wx.redirectTo({ url: `/pages/result/result?taskId=${this.data.taskId}` }) }, 1000)
      } else if (status === 'failed') {
        this.clearTimer()
        this.setData({ statusText: res.error_message || '生成失败' })
        wx.showToast({ title: '生成失败', icon: 'error' })
      }
    }).catch(() => {})
  }
})
