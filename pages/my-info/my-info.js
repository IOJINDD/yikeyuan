// pages/my-info/my-info.js
import { wxlogin, getOpenId, userDetail } from '../../services/service.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selfIcon: '/common/assets/images/selfInfo.png',
    orderIcon: '/common/assets/images/order.png',
    videoIcon: '/common/assets/images/video.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取用户信息
    console.log(app.globalData.userInfo)

    if (wx.getStorageSync('appOpenid')) {
      this.setData({
        userInfo: wx.getStorageSync('wxInfo'),
        hasUserInfo: true
      })
    } else {
      this.setData({
        hasUserInfo: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 授权登录
  bindgetuserinfo: function (e) {
    console.log(e)
    // 授权成功
    if (e.detail.userInfo) {

      // 获取 unionid 
      wx.getUserInfo({
        success: infoRes => {
          wx.login({
            success: loginRes => {
              getOpenId.bind(this)({
                wxcode: loginRes.code
              }).then((res) => {

                if (res.code == 200) {
                  // 保存个人信息
                  wx.setStorageSync('wxInfo', e.detail.userInfo)
                  this.setData({
                    userInfo: e.detail.userInfo,
                    hasUserInfo: true
                  })

                  // 保存openid
                  wx.setStorageSync('appOpenid', res.dataBody)

                  let data = e.detail.userInfo
                  data['appOpenid'] = res.dataBody

                  // 用户模块 / 微信小程序授权登陆
                  wxlogin.bind(this)(data).then(res => {
                    wx.setStorageSync('userInfo', res.dataBody)
                    wx.setStorageSync('authorization', res.dataBody.authorization)
                  })
                } else {
                  console.log('获取unionid失败', res)
                }
              })
            }
          })

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
    } else {
      // 授权失败
    }
  }
})