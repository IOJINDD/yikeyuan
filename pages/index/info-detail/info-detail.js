// pages/information/InfoDetail.js
import { getArticleDetail } from '../../../services/service.js'
var WxParse = require('../../../wxParse/wxParse.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options', options)
    wx.setNavigationBarTitle({
      title: '资讯详情',
    })

    let id = 1
    if (options && options.q) {
      id = options.q.split('id%3D')[1]
    } else {
      id = options.id
    }

    // 获取id
    getArticleDetail.bind(this)({
      id: id
    }).then(res => {
      this.setData({
        detail: res.dataBody
      })

      if (WxParse.wxParse('article', 'html', res.dataBody.content, this, 5)) {
        this.setData({
          article: WxParse.wxParse('article', 'html', res.dataBody.content, this, 5)
        })
      }
    })
    this.videoContext = wx.createVideoContext('myVideo')  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      windowWidth: wx.getStorageSync('systemInfo').windowWidth
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  }
})