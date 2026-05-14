const apiGenerate = require('../../api/generate');

Page({
  data: { formData: { history: '', content: '', mood: '', poem: '' } },
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`formData.${field}`]: e.detail.value });
  },
  useExample() {
    this.setData({
      formData: {
        history: '由明代艺术家文徵明所画的作品《寒林孤客图》。',
        content: '画面描绘了初冬时节的苍茫山林，枯木交错，一条蜿蜒的小路延伸至深谷，一位高士独自行走其间，笔墨温润秀拔。',
        mood: '这是一幅充满文人孤傲与清幽意境的画作，表达了远离尘嚣、回归内心的淡泊情怀。',
        poem: '千山鸟飞绝，万径人踪灭。'
      }
    });
  },
  clearInput() { this.setData({ formData: { history: '', content: '', mood: '', poem: '' } }); },
  submitTask() {
    const { history, content, mood, poem } = this.data.formData;
    if (!history || !content || !mood || !poem) {
      wx.showToast({ title: '四个字段均不能为空', icon: 'none' });
      return;
    }
    wx.showLoading({ title: '提交中...' });
    apiGenerate.generateByPainting(this.data.formData).then(res => {
      wx.hideLoading();
      if (res && res.task_id) {
        wx.navigateTo({ url: `/pages/task-detail/task-detail?taskId=${res.task_id}` });
      }
    }).catch(() => { wx.hideLoading(); });
  }
});
