// pages/index/info-list/info-list.js
import { getArticlesList } from '../../../services/service.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: {
      pageNo: 1,
      pageSize: 5
    },
    categories: [{
      name: '精彩活动'
    }, {
      name: '名校探秘'
    }, {
      name: '课外教育'
    }],
    dataBody: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(options.index)
    this.setData({
      activitedIndex: options.index
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
   * 分页获取商品信息
   */
  getList: function (type) {
    wx.showLoading({
      title: '加载中...',
    })

    getArticlesList.bind(this)({
      pageNo: this.data.page.pageNo,
      pageSize: this.data.page.pageSize,
      keyword: this.data.keyword,
      type: type
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

  goDetail: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/index/info-detail/info-detail?id=${e.currentTarget.dataset.id}`,
    })
  },

  /**
   * 上拉刷新
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
    this.getList(e.target.dataset.index)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})