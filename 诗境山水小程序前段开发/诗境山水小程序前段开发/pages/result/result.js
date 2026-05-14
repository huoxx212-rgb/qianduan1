const apiTask = require('../../api/task');

Page({
  data: { taskId: '', taskType: '', resultData: {} },
  onLoad(options) {
    if (options.taskId) {
      this.setData({ taskId: options.taskId });
      this.fetchResult();
    }
  },
  fetchResult() {
    wx.showLoading({ title: '加载结果中' });
    apiTask.getTaskDetail(this.data.taskId).then(res => {
      wx.hideLoading();
      this.setData({ taskType: res.type, resultData: res.result });
    }).catch(() => { wx.hideLoading(); });
  },
  goBack() { wx.navigateBack(); },
  goHome() { wx.reLaunch({ url: '/pages/index/index' }); },
  goHistory() { wx.redirectTo({ url: '/pages/history/history' }); }
});
