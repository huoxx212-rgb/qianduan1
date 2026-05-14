const config = require('./config')

function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: { 'content-type': 'application/json' },
      success(res) {
        const data = res.data
        if (data.code === 0) {
          resolve(data.data)
        } else {
          wx.showToast({ title: data.message || '请求失败', icon: 'none' })
          reject(data)
        }
      },
      fail(err) {
        wx.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}
module.exports = request
