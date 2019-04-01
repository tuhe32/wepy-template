import http from '../utils/Http'
import validate from '../utils/Validate'

//接口API统一
export default class api {


    //微信登录后台获取微信openID
    static apiWecahtLogin(code) {
      return http.get('wechat/user/login?code='+code).then(resp => resp)
    }
    //微信获得用户信息
    static apiWechatInfo(param) {
      return http.post('wechat/user/info',param).then(resp => resp)
    }
    //微信用户手机登录
    static apiWechatPhone(param) {
      return http.post('wechat/user/phone',param).then(resp => resp)
    }
    //报表接口
    static apiReportForms(param) {
      return http.post('weixin/reportForms/orderReports',param).then(resp => resp)
    }
    //9块9包邮
    static apiNineDotsNine(param) {
      return http.post('weixin/product/findNineDotNineList',param).then(resp => resp)
    }
    //爆款排行
    static apiSoldQuantityTop(param) {
      return http.post('weixin/product/findSoldQuantityTop100List',param).then(resp => resp)
    }
    //限时高佣金
    static apiHighPromotionAmount(param) {
      return http.post('weixin/product/findListByHighPromotionAmount',param).then(resp => resp)
    }
    //品牌清仓
    static apiBrandsTop(param) {
      return http.post('weixin/product/findListBrands',param).then(resp => resp)
    }
    //首页获取产品列表,页码从1开始
    static apiGetProductList(param){
      return http.post('weixin/product/findList',param).then(resp=>resp)
    }
    //首页获取产品详情
    static apiGetProductDetail(param){
      return http.post('weixin/product/findDetail',param).then(resp=>resp)
    }
    //获取领券推广的拼多多页面url
    static apiGetPromotionUrl(param) {
      return http.post('weixin/product/genPromotionUrl',param).then(resp=>resp)
    }
    //获取产品分类
    static apiProductTypes() {
      // limit = validate.optional(limit) ?limit:6
      return http.post('weixin/productType/getOpenProductTypes').then(resp => resp)
    }
    //获取用户信息
    static apiGetUserInfo(param){
      return http.post('wechat/user/getUserInfo',param).then(resp=>resp)
    }
    //保存邀请码
    static apiSaveInviteCode(param) {
     return http.post('wechat/user/saveInviteCode',param).then(resp=>resp) 
    }
    //个人及团队个人中心统计
    static apiPersonalReports(param) {
     return http.post('wechat/userCenter/personalReports',param).then(resp=>resp) 
    }
    //我的团队列表统计
    static apiMyTeam(param) {
     return http.post('wechat/userCenter/myTeam',param).then(resp=>resp) 
    }
    //我的订单列表
    static apiMyOrderList(param) {
     return http.post('wechat/userCenter/findOrderList',param).then(resp=>resp) 
    }
    //我的收藏列表
    static apiMyFavoriteList(param) {
     return http.post('wechat/favoriteProduct/findList',param).then(resp=>resp) 
    }
    //收藏
    static apiFavorite(param) {
     return http.post('wechat/favoriteProduct/saveOne',param).then(resp=>resp) 
    }
    //取消收藏
    static apiUnFavorite(param) {
     return http.post('wechat/favoriteProduct/deleteOne',param).then(resp=>resp) 
    }
    //查找收藏
    static apiFindFavorite(param) {
     return http.post('wechat/favoriteProduct/findOne',param).then(resp=>resp) 
    }
    //批量取消收藏
    static apiBatchUnFavorite(param) {
     return http.post('wechat/favoriteProduct/batchDelete',param).then(resp=>resp) 
    }
    //获取当前用户的推荐人信息
    static apiGetReferee(param) {
     return http.post('wechat/userCenter/getReferee',param).then(resp=>resp) 
    }

    //分享活动
    static apiShareActivity(param){
      return http.put('api/v1/activity/share',param).then(resp=>resp)
    }
    //点赞分享的活动
    static apiLikedActivity(param){
      return http.put('api/v1/activity/liked',param).then(resp=>resp)
    }
    static apiGetActivityAboutInfo(code,shareId,productInfoIds){
      return http.get('api/v1/activity/init?code='+code+'&shareId='+shareId+'&productInfoIds='+productInfoIds).then(resp=>resp)
    }
    //发布产品
    static apiAddProduct(param){
      console.log(param);
      return http.post('api/v1/info/save',param).then(resp=>resp)
    }
    //用户获取本人发布的产品列表,包括历史产品
    static apiGetMyProductList(page){
      return http.get('api/v1/info/userAllInfoList?page='+page).then(resp=>resp)
    }
    //卖家删除产品
    static apiDeleteProduct(param){
      return http.delete('api/v1/info/deleted?id='+param).then(resp=>resp)
    }
    //买家获取购买订单列表
    static apiGetBuyList(param){
      return http.get('api/v1/order/buyList',param).then(resp=>resp)
    }
    //买家确认收货
    static apiUpdateOrderReceived(param){
      return http.put('api/v1/order/receive',param).then(resp=>resp)
    }

    //卖家获取单个产品的订单列表
    static apiGetOrderListByProduct(param){
      return http.get('api/v1/order/proOrderList',param).then(resp=>resp)
    }
    //卖家确认发货
    static apiUpdateOrderDelivered(param){
      return http.put('api/v1/order/deliver',param).then(resp=>resp)
    }
    //卖家取消订单
    static apiUpdateOrderCancel(param){
      return http.put('api/v1/order/cancel',param).then(resp=>resp)
    }
    //创建订单
    static apiAddOrder(param){
      return http.post('api/v1/order/create',param).then(resp=>resp)
    }
    //支付
    static apiOrderPay(param){
      return http.post('api/v1/order/pay',param).then(resp=>resp)
    }
    //获取用户钱包余额
    static apiGetBalance(){
      return http.get('api/v1/finance/getBalance').then(resp=>resp)
    }
    //提现
    static apiWithdrawals(param){
      return http.post('api/v1/finance/withdrawals',param).then(resp=>resp)
    }
    //获取账单列表
    static apiGetBills(){
      return http.get('api/v1/finance/billFlow').then(resp=>resp)
    }

    //修改用户信息
    static apiUpdateUserInfo(param){
      return http.get('api/v1/user/save',param).then(resp=>resp)
    }
    //发送验证码到用户手机
    static apiSendCaptcha(param){
      return http.post('api/v1/user/saveCaptcha',param).then(resp=>resp)
    }
    //查询用户所有的地址列表
    static apiGetMyAddressList(param){
      return http.get('api/v1/address/list').then(resp=>resp)
    }
    //查询地址详情
    static apiGetAddressDetail(param){
      return http.get('api/v1/address/info?id='+param).then(resp=>resp)
    }
    //新增或编辑地址
    static apiSaveAddress(param){
      return http.post('api/v1/address/save',param).then(resp=>resp)
    }
    //删除地址
    static apiDeleteAddress(param){
      return http.delete('api/v1/address/delete?id='+param).then(resp=>resp)
    }
    //设置为默认地址
    static apiSetDefaultAddress(param){
      return http.put('api/v1/address/default?id='+param).then(resp=>resp)
    }
    //取消默认地址
    static apiCancelDefaultAddress(param){
      return http.put('api/v1/address/cancelDefault?id='+param).then(resp=>resp)
    }

    //关注某人
    static apiAddAttention(param){
      return http.post('api/v1/index/attention',param).then(resp=>resp)
    }

    //取消关注某人
    static apiCancelAttention(param){
      return http.post('api/v1/index/cancelAttention',param).then(resp=>resp)
    }

    //关注产品列表
    static apiGetAttentionProductList(param){
      return http.get('api/v1/index/attentionInfoList?page='+param).then(resp=>resp)
    }

    //获取某个用户的有效产品列表
    static apiGetUserProductList(param){
      return http.get('api/v1/info/userInfoList',param).then(resp=>resp)
    }


    //上传文件
    static apiUploadFile(url, filePath, name, formData, cb , ccb) {
      console.log("========调用上传图片方法============",url);
      wx.uploadFile({
        url: http.baseUrl + url,
        filePath: filePath,
        name: name,
        // header: http.createAuthHeaderFile(),
        formData: formData, // HTTP 请求中其他额外的 form data
        success: function (res) {
          if (res.statusCode == 200 && !res.data.result_code) {
            return typeof cb == "function" && cb(res.data)
          } else {
            return typeof cb == "function" && cb(false)
          }
        },
        fail: function () {
          return typeof cb == "function" && cb(false)
        },
        complete:function () {
          return typeof ccb == "function" && ccb()
        }
      })
    }

}
