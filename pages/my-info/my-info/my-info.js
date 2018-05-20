// pages/my-info/my-info/my-info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailImg: ['/common/assets/images/14.png'],
    sexArr: ['女', '男'],
    sexIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('wxInfo')
    console.log(userInfo)
    wx.setNavigationBarTitle({
      
      title: '个人信息'
    })
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      sexIndex: userInfo.gender
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

  /**
   * 选择性别
   */
  sexChange: function (e) {
    console.log(e)
    this.setData({
      sexIndex: e.detail.value
    })
  },

  /**
   * 
   */
  bindDateChange: function (e) {
    console.log(e)
    this.setData({
      date: e.detail.value
    })   
  }
})