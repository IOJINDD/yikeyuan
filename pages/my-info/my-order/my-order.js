// pages/my-info/my-order/my-order.js
import { getOrderList } from '../../../services/service.js'
import { formatTime, orderStatus } from '../../../utils/util.js'
let sliderWidth = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '未发货', '已发货'],
    orderHeight: 0,
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    orderAll: [], // 全部
    order0: [], // 待付款
    order1: [], // 待发货
    order2: [], // 待收货
    pageAll: {
      pageSize: 4,
      pageNo: 1
    },
    page0: {
      pageSize: 4,
      pageNo: 1
    },
    page1: {
      pageSize: 4,
      pageNo: 1
    },
    page2: {
      pageSize: 4,
      pageNo: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '我的订单',
    })

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          sliderWidth: res.windowWidth / this.data.tabs.length,
          orderHeight: res.windowHeight,
          sliderOffset: res.windowWidth / this.data.tabs.length * this.data.activeIndex
        })
      }
    })

    /**
     * 获取全部的订单信息
     */
    this.getAllOrderList()
    this.getOrderList0()
    this.getOrderList1()
    this.getOrderList2()
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
   * 上拉刷新
   */
  onReachBottom: function (val) {

    // 标题显示加载
    wx.showNavigationBarLoading()
    if (this.data.activeIndex == 0) {
      let pageNo = this.data.page1.pageNo + 1
      this.setData({
        page1: {
          pageNo: pageNo,
          pageSize: 4
        }
      })
      this.getOrderList1()
    } else if (this.data.activeIndex == 1) {
      let pageNo = this.data.page2.pageNo + 1
      this.setData({
        page2: {
          pageNo: pageNo,
          pageSize: 4
        }
      })
      this.getOrderList2()
    } else if (this.data.activeIndex == 2) {
      let pageNo = this.data.page2.pageNo + 1
      this.setData({
        page2: {
          pageNo: pageNo,
          pageSize: 4
        }
      })
      this.getOrderList2()
    } else if (this.data.activeIndex == 3) {
      let pageNo = this.data.page2.pageNo + 1
      this.setData({
        page2: {
          pageNo: pageNo,
          pageSize: 4
        }
      })
      this.getOrderList2()
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 切换tab栏
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    })
  },
  hideInput: function () {
    this.setData({
      inputVal: '',
      inputShowed: false
    })
  },
  clearInput: function () {
    this.setData({
      inputVal: ''
    })
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },

  /**
   * 获取全部订单列表
   */
  getAllOrderList: function () {

    // 获取订单
    getOrderList.bind(this)({
      status: '',
      pageSize: this.data.pageAll.pageSize,
      pageNo: this.data.pageAll.pageNo
    }).then(res => {

      let data = this.data.orderAll
      res.dataBody.data.forEach((item, index) => {
        data.push(item)

        // 格式化时间
        console.log(item.createTime)
        data[index].createTime = formatTime(item.createTime)
        data[index].status = orderStatus(item.status)
      })
      this.setData({
        orderAll: data
      })

      // 完成停止加载
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
  },

  /**
   * 获取待付款订单列表
   */
  getOrderList0: function () {
    // 获取订单
    getOrderList.bind(this)({
      status: 0,
      pageSize: this.data.page0.pageSize,
      pageNo: this.data.page0.pageNo
    }).then(res => {
      let data = this.data.order0
      res.dataBody.data.forEach((item, index) => {
        data.push(item)

        // 格式化时间
        console.log(item.createTime)
        data[index].createTime = formatTime(item.createTime)
        data[index].status = orderStatus(item.status)
      })
      this.setData({
        order0: data
      })

      // 完成停止加载
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
  },

  /**
   * 获取待发货订单列表
   */
  getOrderList1: function () {
    // 获取订单
    getOrderList.bind(this)({
      status: 1,
      pageSize: this.data.page1.pageSize,
      pageNo: this.data.page1.pageNo
    }).then(res => {
      let data = this.data.order1
      res.dataBody.data.forEach((item, index) => {
        data.push(item)

        // 格式化时间
        console.log(item.createTime)
        data[index].createTime = formatTime(item.createTime)
        data[index].status = orderStatus(item.status)
      })

      this.setData({
        order1: data
      })

      // 完成停止加载
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
  },

  /**
   * 获取待收货订单列表
   */
  getOrderList2: function () {
    // 获取订单
    getOrderList.bind(this)({
      status: 2,
      pageSize: this.data.page2.pageSize,
      pageNo: this.data.page2.pageNo
    }).then(res => {
      let data = this.data.order2
      res.dataBody.data.forEach((item, index) => {
        data.push(item)

        // 格式化时间
        console.log(item.createTime)
        data[index].createTime = formatTime(item.createTime)
        data[index].status = orderStatus(item.status)
      })
      this.setData({
        order2: data
      })

      // 完成停止加载
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
  }
})