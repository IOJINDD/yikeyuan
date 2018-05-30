// pages/index/video-detail/confirm-order/pay-success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync('systemInfo'))
    this.setData({
      windowHeight: wx.getStorageSync('systemInfo').windowHeight,
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
    return {
      title: '这个商品很棒哦，一起来参团吧',
      path: `pages/mall/product-detail/product-detail?id=${wx.getStorageSync('itemDetail').id}`,
      imageUrl: wx.getStorageSync('itemDetail').imgUrls[0],
      success: (res) => {
        console.log(res)
      }
    }
  },

  /**
   * 继续购买
   */
  goBuy: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 前往个人中心
   */
  goSelf: function () {
    wx.switchTab({
      url: '/pages/my-info/my-info'
    })
  },
})