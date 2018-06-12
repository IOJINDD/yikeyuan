

import uris from './uris.js'
import api from './../api-host.js'

/**
 * 微信小程序 / 获取wx小程序的授权登陆信息（OpenId）
 * 
 */
function getOpenId (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getOpenId + '?wxcode=' + params.wxcode,
      method: 'GET',
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 获取验证码
 */
function getCode(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getCode + '?mobile=' + mobile,
      method: 'GET',
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }) 
}
/**
 * 微信小程序 / 微信小程序登陆
 */
function wxlogin (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.wxlogin,
      method: 'POST',
      data: params,
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 用户模块 / 获取用户详情
 */
function userDetail(appOpenid) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.userDetail + '?appOpenid=' + appOpenid,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 获取轮播图
 */
function getAds() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getAds,
      method: 'GET',
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 修改用户信息
 */
function putUser(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.putUser,
      method: 'PUT',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 用户登录
 */
function userLogin(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.userLogin,
      method: 'POST',
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 商品模块 / 获取商品类型信息
 */
function getCategories (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getCategories + '?parentId=' + params.parentId + '&level=' + params.level,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 商品模块 / 分页获取商品信息
 */
function getPitem(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getPitem + '?categoryFk=' + params.categoryFk + '&pageNo=' + params.pageNo + '&pageSize=' + params.pageSize,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }) 
}

/**
 * 获取商品详情
 */
function getPDetail (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getPDetail + '/' + params.itemId,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }) 
}

/**
 * 订单模块 / 用户拍下订单
 */
function setOrder (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.setOrder,
      method: 'POST',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      data: params,
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }) 
}

/**
 * 订单模块 / 获取订单列表
 */
function getOrderList(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getOrderList + '?status=' + params.status + '&expressFlag=' + params.expressFlag + '&orderNo=' + params.orderNo + '&pageSize=' + params.pageSize + '&pageNo=' + params.pageNo,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }) 
}

/**
 * 订单模块 / 获取订单详情
 */
function getOrderDetail(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getOrderDetail + '?id=' + params.id + '&orderNo=' + params.orderNo,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 资讯模块 / 获取资讯信息列表
 */
function getArticlesList (params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getArticlesList + '?keyword=' + params.keyword + '&pageNo=' + params.pageNo + '&pageSize=' + params.pageSize + '&type=' + params.type + '&delFlag=0&publicFlag=1',
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

/**
 * 用户模块 / 获取用户购买的视频信息(我的视频)
 */
function getSelfVideo(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getSelfVideo + '?categoryFk=' + params.categoryFk + '&pageNo=' + params.pageNo + '&pageSize=' + params.pageSize,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
  
}

function getArticleDetail(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getArticleDetail + '?id=' + params.id,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  }) 
}

/**
 * 商品模块 / 免费视频收藏
 */

function getCollection(params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: api.devApiHost + uris.getCollection + '?id=' + params.id,
      method: 'GET',
      header: {
        Authorization: wx.getStorageSync('authorization')
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })  
}
export {
  getOpenId,
  userDetail,
  getAds,
  putUser,
  userLogin,
  getPitem,
  getPDetail,
  setOrder,
  getOrderList,
  getCode,
  getOrderDetail,
  getArticlesList,
  getCategories,
  getSelfVideo,
  getArticleDetail,
  getCollection,
  wxlogin
}