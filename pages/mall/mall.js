// pages/information/information.js
import { getPitem } from '../../services/service.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: {
      pageNo: 1,
      pageSize: 5
    },
    keyword: '',
    defaultImg: '/common/assets/images/default.jpeg',
    dataBody: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    wx.showLoading({
      title: '加载中...',
    })

    // 获取商品信息
    getPitem.bind(this)({
      categoryFk: this.data.categoryFk,
      pageNo: 1,
      pageSize: 5
    }).then(res => {
      let data = []
      res.dataBody.data.forEach((item) => {
        data.push(item)
      })
      this.setData({
        dataBody: data
      })

      // 完成停止加载
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let pageNo = this.data.page.pageNo + 1
    this.setData({
      page: {
        pageNo: pageNo,
        pageSize: 5
      }
    })
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取资讯列表
   */
  getList: function () {
    wx.showLoading({
      title: '加载中...',
    })

    // 获取商品信息
    getPitem.bind(this)({
      categoryFk: this.data.categoryFk,
      pageNo: this.data.page.pageNo,
      pageSize: this.data.page.pageSize
    }).then(res => {
      let data = this.data.dataBody
      res.dataBody.data.forEach((item) => {
        data.push(item)
      })
      this.setData({
        dataBody: data
      })

      // 完成停止加载
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
  },

  /**
   * 查看详情
   */
  goDetail: function (e) {
    console.log(e)

    wx.navigateTo({
      url: `./product-detail/product-detail?id=${e.currentTarget.dataset.id}`,
    })
  }
})