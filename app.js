//app.js
// import { userDetail } from './services/service.js'
let userInfo = {}
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 保存手机信息
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.globalData.systemInfo = res
        wx.setStorageSync('systemInfo', res)
      }
    })

  },
  globalData: {
    userInfo: null,
    systemInfo: null
  }
})