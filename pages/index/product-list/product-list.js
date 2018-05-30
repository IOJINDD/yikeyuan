// pages/index/product-list/product-list.js
import { getPitem } from '../../../services/service.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    imgAll: '/common/assets/images/all.svg',
    page: {
      pageNo: 1,
      pageSize: 5
    },
    dataBody: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.id == 'all') {
      this.getProductList()
    } else {
      this.getProductList(wx.getStorageSync('categories')[options.id].id)
    }
    this.setData({
      activitedIndex: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.getStorageSync('categories'))
    this.setData({
      categories: [wx.getStorageSync('categories')[0], wx.getStorageSync('categories')[1], wx.getStorageSync('categories')[2], wx.getStorageSync('categories')[3], wx.getStorageSync('categories')[4]]
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
    wx.showNavigationBarLoading()
    let pageNo = this.data.page.pageNo + 1
    this.setData({
      page: {
        pageNo: pageNo,
        pageSize: 5
      }
    })
    this.getProductList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * tab切换
   */
  changeSpan: function (e) {
    this.setData({
      activitedIndex: e.target.dataset.index,
      dataBody: [],
      page: {
        pageNo: 1,
        pageSize: 5
      }
    })
    if (e.target.dataset.index == 'all') {
      this.getProductList()
    } else {
      this.getProductList(this.data.categories[e.target.dataset.index].id)
    }
  },

  /**
   * 获取数据
   */
  getProductList: function (categoryFk) {
    wx.showLoading({
      title: '加载中...',
    })
    // 获取商品信息
    getPitem.bind(this)({
      categoryFk: categoryFk,
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
})