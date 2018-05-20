//index.js
import { getAds, getCategories, getPitem } from '../../services/service.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    timeIcon: '/common/assets/images/time.svg',
    autoplay: false,
    imgAll: '/common/assets/images/all.svg',
    page: {
      pageNo: 1,
      pageSize: 5
    },
    dataBody: []
  },
  onLoad: function () {

    // 获取轮播
    getAds.bind(this)().then(res => {
      let imgUrls = []
      res.dataBody.forEach((item, index) => {
        imgUrls.push(item.url)
      })
      this.setData({
        imgUrls: imgUrls
      })
    })

    // 获取商品类型
    getCategories.bind(this)({
      parentId: null,
      level: 1
    }).then(res => {
      wx.setStorageSync('categories', res.dataBody)
      this.setData({
        categories: res.dataBody
      })
    })

    // 获取商品
    this.getProductList()
    // 设置高度
    if (app.globalData.systemInfo) {
      this.setData({
        windowWidth: app.globalData.systemInfo.windowWidth
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 查看详情
   */
  goDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `./video-detail/video-detail?id=${e.currentTarget.dataset.id}`
    })
  },

  /**
   * 分页获取商品信息
   */
  getProductList: function () {
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
   * 上拉刷新
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
   * 去列表搜索页
   */
  goSearch: function (e) {
    console.log(e)
    wx.navigateTo({
      url: `./product-list/product-list?id=${e.currentTarget.dataset.index}`,
    })
  }
})
