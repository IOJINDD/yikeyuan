


const uris = {
  getOpenId: '/api/wx/app/openid', // 微信模块 / 获取openId
  wxlogin: '/api/u/wxapp/login', // 用户模块 / 微信小程序授权登陆
  getAds: '/api/img/ads', // 通用模块 / 获取轮显图
  getCode: '/api/c/sms-code', // 通用模块 / 发送短信验证码
  userDetail: '/api/u/wx/info', // 用户模块 / 获取用户的微信信息
  wxPay: '/api/wx/app/pay', // 微信模块 / 获取微信App支付
  putUser: '/api/u/user', // 用户模块 / 修改用户信息
  getCategories: '/api/p/categories', //商品模块 / 获取商品类型信息
  getPitem: '/api/p/items', //商品模块 / 分页获取商品信息
  getPDetail: '/api/p/item', //商品模块 / 获取商品详情
  setOrder: '/api/o/order', //订单模块 / 用户拍下订单
  getOrderList: '/api/o/orders', //订单模块 / 获取订单列表
  getOrderDetail: '/api/o/order', //订单模块 / 获取订单详情
  getArticlesList: '/api/info/articles', //资讯模块 / 获取资讯信息列表
  getArticleDetail: '/api/info/article', //资讯模块 / 获取资讯信息列表
  getCollection: '/api/p/collection', //商品模块 / 免费视频收藏
  getSelfVideo: '/api/u/video', //用户模块 / 获取用户购买的视频信息(我的视频)
  userLogin: '/api/u/login', // 用户模块 / 用户登陆
}
export default uris