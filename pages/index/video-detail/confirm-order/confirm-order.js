// pages/index/video-detail/confirm-order/confirm-order.js
import { setOrder } from '../../../../services/service.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailImg: ['/common/assets/images/13.png'],
    reduceIcon: '/common/assets/images/reduce.svg',
    reduceIcon2: '/common/assets/images/reduce2.svg',
    addIcon: '/common/assets/images/add.svg',
    addIcon2: '/common/assets/images/add2.svg',
    locationImg: '/common/assets/images/location.png',
    goodsNumber: 1,
    reduceDis: true,
    itemDetail: {},
    buyType: '',
    receiveAddress: {}, // 收货地址详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      windowHeight: wx.getStorageSync('systemInfo').windowHeight,
      itemDetail: wx.getStorageSync('itemDetail')
    })

    if (options.buyType == 'alone') {
      this.setData({
        buyType: ' ',
        price: (wx.getStorageSync('itemDetail').itemPrice / 100).toFixed(2)
      })
    } else if (options.buyType == 'activity') {
      this.setData({
        buyType: wx.getStorageSync('itemDetail').actTag,
        price: (wx.getStorageSync('itemDetail').fixedPrice / 100).toFixed(2)
      })
    }

    
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
    if (wx.getStorageSync('address')) {
      this.setData({
        receiveAddress: wx.getStorageSync('address')
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

  /**
   * 减少
   */
  reduceNumber: function () {
    if (this.data.goodsNumber === 2) {
      this.setData({
        reduceDis: true
      })
    }
    this.setData({
      goodsNumber: this.data.goodsNumber - 1
    })

    if (this.data.goodsNumber < 1) {
      this.setData({
        goodsNumber: 1,
        reduceDis: true
      })
    }
  },

  /**
   * 增加
   */
  addNumber: function () {
    this.setData({
      goodsNumber: Number(this.data.goodsNumber) + 1,
      reduceDis: false
    })
  },

  /**
   * 监听数值变化
   */
  eventNumber: function (e) {
    if (e.detail.value < 1) {
      this.setData({
        goodsNumber: 1,
        reduceDis: true

      })
    } else {
      this.setData({
        goodsNumber: e.detail.value,
        reduceDis: false
      })
    }
  },

  /**
   * 监听备注
   */
  eventRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * 获取收货地址
   */
  getAddress: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.address'] == false) {
          this.openConfirm('检查到您没打开收货地址权限，是否去设置打开？')
        } else {
          wx.chooseAddress({
            success: (res) => {

              // 保存收货地址
              wx.setStorageSync('address', res)
              console.log(res)
            }
          })
        }
      }
    })
  },

  /**
   * 重新调用获取地址
   */
  openConfirm: function (content) {
    wx.showModal({
      title: '提示',
      content: content,
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {

            }
          })
        }
      }
    })
  },

  /**
   * 立即支付
   */
  goPay: function () {
    let itemDetail = wx.getStorageSync('itemDetail')

    if (this.data.receiveAddress.detailInfo) {
      if (wx.getStorageSync('wxInfo')) {
        setOrder.bind(this)({
          itemFk: itemDetail.id,
          price: this.data.price * 100 * this.data.goodsNumber,
          appOpenid: wx.getStorageSync('appOpenid'),
          buyNum: this.data.goodsNumber,
          oExpressInfo: {
            province: this.data.receiveAddress.provinceName,
            city: this.data.receiveAddress.cityName,
            district: this.data.receiveAddress.countyName,
            address: this.data.receiveAddress.detailInfo,
            nationaCode: this.data.receiveAddress.nationaCode,
            postalCode: this.data.receiveAddress.postalCode,
            mobile: this.data.receiveAddress.telNumber,
            receiver: this.data.receiveAddress.userName,
          }
        }).then(res => {
          if (res.code == 200) {
            console.log(res)
            wx.requestPayment({
              timeStamp: res.dataBody.timeStamp,
              nonceStr: res.dataBody.nonceStr,
              package: res.dataBody.package,
              signType: res.dataBody.signType,
              paySign: res.dataBody.paySign,
              success: (res) => {
                console.log(res)
                wx.redirectTo({
                  url: './pay-success',
                })
              },
              fail: (res) => {
                console.log(res)
              }
            })
          } else {
            if (res.msg == '用户未认证' || res.msg == '请填写完整信息') {
              this.openConfirm('下单功能需要您授权用户信息才能进行，是否去设置打开？')
            } else {
              wx.showToast({
                title: res.msg,
                icon: 'none'
              })
            }
          }
        })
      } else {
        this.openConfirm('下单需要授权用户信息，是否去设置打开？')
      }
    } else {
      wx.showToast({
        title: '亲，收货地址不能为空',
        icon: 'none'
      })
    }
  }
})