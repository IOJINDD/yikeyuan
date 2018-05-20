const formatTime = time => {
  console.log(time)
  if (!time) return '';

  var date = new Date(time);
  var M = date.getMonth() + 1;
  var y = date.getFullYear();
  var d = date.getDate();
  var h = date.getHours()
  var m = date.getMinutes()
  var s = date.getSeconds()

  if (M < 10) M = "0" + M;
  if (d < 10) d = "0" + d;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 *
 * @param {Array} params - 要检查的数组
 * @param {Array} toasts - 对于的提示语句
 * @param {function} callback - 执行的方法
 */
const checkData = (params, toasts, callback) => {
  let flag = true
  params.forEach(function (element, index) {
    if (!element) {
      if (flag) {
        wx.showToast({
          title: toasts[index],
          icon: 'none'
        })
      }
      flag = false
    }
  }, this)
  if (flag) {
    callback()
  }
}

/**
 *
 * @param {Boolean} isFun - 是否执行函数
 * @param {Boolean} code - 状态码
 * @param {Array} success - 执行的方法/语句
 * @param {function} fail - 执行的方法/语句
 */
const checkCode = (isFun, code, success, fail) => {
  if (isFun) {
    if (code == 200) {
      success()
    } else {
      fail()
    }
  } else {
    if (code == 200) {
      wx.showToast({
        title: success,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: fail,
      })
    }
  }
}

/**
 * 解析支付状态
 */
const orderStatus = (status) => {
  if (status == 0) {
    return '待付款'
  } else if (status == 1) {
    return '待发货'
  } else if (status == 2) {
    return '待收货'
  }
}

const typeStatus = (status) => {
  if (status == 0) {
    return '微信转账'
  } else if (status == 1) {
    return '支付宝转账'
  } else if (status == 2) {
    return '银行转账'
  }
}

const dealFlag = (status) => {
  if (status == 0) {
    return '未转账'
  } else if (status == 1) {
    return '已转账'
  }
}

module.exports = {
  formatTime: formatTime,
  checkData: checkData,
  checkCode: checkCode,
  orderStatus: orderStatus,
  typeStatus: typeStatus,
  dealFlag: dealFlag
}
