Page({
  data: {
    historyList: [{
      task_id: 'task_001',
      type: 'poem',
      title: '千山鸟飞绝，万径人踪灭。',
      image_url: '../../assets/images/demo-result.png',
      created_at: '2026-05-13 20:00:00'
    }]
  },
  viewDetail(e) {
    const taskId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/result/result?taskId=${taskId}` });
  }
});
