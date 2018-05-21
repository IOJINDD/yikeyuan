// pages/index/video-detail/video-detail.js
import { getCode, getPDetail, getCollection, wxlogin, getOpenId, userDetail } from '../../../services/service.js'
import { checkData } from '../../../utils/util.js'
const app = getApp()
let time = 0
let _options 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneIcon: '/common/assets/images/phone.svg',
    codeIcon: '/common/assets/images/code.svg',
    phone: '',
    code: '',
    itemDetail: {},
    homeIcon: '/common/assets/images/home.svg',
    hintMessage: '获取验证码', // 获取验证码提示语
    modalFlag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _options = options
    // 设置宽度
    if (app.globalData.systemInfo) {
      this.setData({
        windowWidth: app.globalData.systemInfo.windowWidth
      })
    }

    getPDetail.bind(this)({
      itemId: options.id
    }).then(res => {
      this.setData({
        itemDetail: res.dataBody
      })

      wx.setStorageSync('itemDetail', res.dataBody)
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
    // 获取用户信息
    console.log(app.globalData.userInfo)

    if (wx.getStorageSync('appOpenid')) {
      this.setData({
        userInfo: wx.getStorageSync('wxInfo'),
        hasUserInfo: true
      })
    } else {
      this.setData({
        hasUserInfo: false
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
   * 送朋友
   */
  goSend: function () {
    console.log('111')
    wx.navigateTo({
      url: './send-friend/send-friend',
    })
  },

  /**
   * 单独购
   */
  goAloneBuy: function () {
    wx.navigateTo({
      url: './confirm-order/confirm-order?buyType=alone',
    })
  },

  /**
   * 团购
   */
  goMoreBuy: function () {
    wx.navigateTo({
      url: './confirm-order/confirm-order?buyType=activity',
    })
  },

  /**
   * 立即购买
   */
  // goBuyNow: function () {

  // },

  modalOk: function () {
    checkData([this.data.phone, this.data.code], ['手机号不能为空', '验证码不能为空'], () => {
      this.setData({
        modalFlag: true
      })
    })
  },

  modalNo: function () {
    this.setData({
      modalFlag: true
    })
  },

  /**
   * 监听手机号
   */
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 监听验证码
   */
  inputCode: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 获取验证码
   */
  getCode: function () {
    if (this.data.phone.length == 11) {
      if (time == 0) {
        time = 30
        let countDown = setInterval(() => {
          this.setData({
            hintMessage: '重新发送' + time
          })
          time--
          if (time < 0) {
            clearInterval(countDown)
            this.setData({
              hintMessage: '获取验证码'
            })
            time = 0
          }
        }, 1000)
        // getCode.bind(this)(this.data.phone).then((res) => {
        //   if (res.code == 200) {
        //     wx.showToast({
        //       title: '发送成功',
        //     })
        //   } else {
        //     wx.showModal({
        //       title: '获取失败',
        //       content: res.msg,
        //     })
        //   }
        // })
        wx.showToast({
          title: '发送成功',
        })
      } else {

      }
    } else {
      wx.showToast({
        title: '手机号输入有误',
        icon: 'none'
      })
    }
  },

  /**
   * 收藏
   */
  goCollection: function () {
    getCollection.bind(this)({
      id: this.data.itemDetail.id
    }).then(res => {
      console.log(res)
      if (res.code == 200) {
        this.setData({
          ['itemDetail.needReBuy']: false
        })
        wx.showModal({
          title: '提示',
          content: '收藏成功！',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })  
      }
    })
  },

  // 授权登录
  bindgetuserinfo: function (e) {
    console.log(e)
    // 授权成功
    if (e.detail.userInfo) {

      // 获取 unionid 
      wx.getUserInfo({
        success: infoRes => {
          wx.login({
            success: loginRes => {
              getOpenId.bind(this)({
                wxcode: loginRes.code
              }).then((res) => {

                if (res.code == 200) {
                  // 保存个人信息
                  wx.setStorageSync('wxInfo', e.detail.userInfo)
                  this.setData({
                    userInfo: e.detail.userInfo,
                    hasUserInfo: true
                  })

                  // 保存openid
                  wx.setStorageSync('appOpenid', res.dataBody)

                  let data = e.detail.userInfo
                  data['appOpenid'] = res.dataBody

                  // 用户模块 / 微信小程序授权登陆
                  wxlogin.bind(this)(data).then(res => {
                    wx.setStorageSync('userInfo', res.dataBody)
                    wx.setStorageSync('authorization', res.dataBody.authorization)
                    this.onLoad(_options)
                  })
                } else {
                  console.log('获取unionid失败', res)
                }
              })
            }
          })

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
    } else {
      // 授权失败
    }
  }
})
