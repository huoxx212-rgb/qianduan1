const apiGenerate = require('../../api/generate')

Page({
  data: { poem: '' },
  onInput(e) { this.setData({ poem: e.detail.value }) },
  useExample() { this.setData({ poem: '千山鸟飞绝，万径人踪灭。' }) },
  clearInput() { this.setData({ poem: '' }) },
  startGenerate() {
    if (!this.data.poem.trim()) {
      wx.showToast({ title: '请输入诗句', icon: 'none' })
      return
    }
    wx.showLoading({ title: '提交中...' })
    apiGenerate.generateByPoem(this.data.poem).then(res => {
      wx.hideLoading()
      if (res && res.task_id) {
        wx.navigateTo({ url: `/pages/task-detail/task-detail?taskId=${res.task_id}` })
      }
    }).catch(() => { wx.hideLoading() })
  }
})
