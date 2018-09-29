//index.js
import { getAds, getCategories, getPitem, getArticlesList } from '../../services/service.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    timeIcon: '/common/assets/images/time.svg',
    autoplay: false,
    defaultImg: '/common/assets/images/default.jpeg',
    imgAll: '/common/assets/images/all.svg',
    ads: [],
    page: {
      pageNo: 1,
      pageSize: 5
    },
    categories: [{
      name: '精彩活动',
      iconUrl: '/common/assets/images/activity.svg'
    }, {
      name: '名校探秘',
      iconUrl: '/common/assets/images/school.png'
    }, {
      name: '素质教育',
      iconUrl: '/common/assets/images/education.png'
    }],
    windowWidth: 375,
    dataBody: []
  },
  onLoad: function () {

    // console.log(wx.getStorageSync('systemInfo'))
    this.setData({
      windowWidth: wx.getStorageSync('systemInfo').windowWidth
    })
    // 获取轮播
    getAds.bind(this)().then(res => {
      let imgUrls = []
      res.dataBody.forEach((item, index) => {
        imgUrls.push(item.url)
      })
      this.setData({
        imgUrls: imgUrls,
        ads: res.dataBody
      })
    })

    // 获取商品类型
    getCategories.bind(this)({
      parentId: null,
      level: 1
    }).then(res => {
      wx.setStorageSync('categories', res.dataBody)
    })

    // 获取商品
    this.getList()
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
      url: `./info-detail/info-detail?id=${e.currentTarget.dataset.id}`
    })
  },

  /**
   * 分页获取商品信息
   */
  getList: function () {
    wx.showLoading({
      title: '加载中...',
    })

    getArticlesList.bind(this)({
      pageNo: 1,
      pageSize: 3,
      keyword: this.data.keyword
    }).then(res => {
      let data = this.data.dataBody
      res.dataBody.data.forEach((item, index) => {
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('1111')
    wx.showLoading({
      title: '加载中...',
    })

    // 获取轮播
    getAds.bind(this)().then(res => {
      let imgUrls = []
      res.dataBody.forEach((item, index) => {
        imgUrls.push(item.url)
      })
      this.setData({
        imgUrls: imgUrls,
        ads: res.dataBody
      })
    })

    getArticlesList.bind(this)({
      pageNo: 1,
      pageSize: 3,
      keyword: this.data.keyword
    }).then(res => {
      console.log(res)
      let data = []
      res.dataBody.data.forEach((item, index) => {
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
   * 上拉刷新
   */
  onReachBottom: function () {
    console.log('2222')
    // let pageNo = this.data.page.pageNo + 1
    // this.setData({
    //   page: {
    //     pageNo: pageNo,
    //     pageSize: 5
    //   }
    // })
    // this.getList()
  },

  /**
   * 去列表搜索页
   */
  goSearch: function (e) {
    console.log(e)
    if (e.currentTarget.dataset.index == 3) {
      wx.switchTab({
        url: '/pages/mall/mall',
      })
    } else {
      wx.navigateTo({
        url: `./info-list/info-list?index=${e.currentTarget.dataset.index}`,
      })
    }
  },

  /**
   * 查看大图
   */
  previewImage: function (e) {
    console.log(e)
    // console.log(e.currentTarget.dataset.index)
    // wx.previewImage({
    //   current: this.data.imgUrls[e.currentTarget.dataset.index], // 当前显示图片的http链接
    //   urls: this.data.imgUrls // 需要预览的图片http链接列表
    // })
    // 判断跳转至资讯还是商品
    if (this.data.ads[e.currentTarget.dataset.index].linkType == 0) {
      wx.navigateTo({
        url: `./info-detail/info-detail?id=${this.data.ads[e.currentTarget.dataset.index].linkFk}` ,
      })
    } else if (this.data.ads[e.currentTarget.dataset.index].linkType == 1) {
      wx.navigateTo({
        url: `/pages/mall/product-detail/product-detail?id=${this.data.ads[e.currentTarget.dataset.index].linkFk}`,
      })
    }
  }
})
