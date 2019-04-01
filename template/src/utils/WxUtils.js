import Tips from './Tips';
import wepy from 'wepy';

export default class WxUtils {
  //tabbar 的路由，每个项目都需要单独配置，不然出事了你就傻眼了
  static tabUrls = ['/pages/index', '/pages/help', '/pages/user/index'];
  static mapUrls = {
    '/pages/shop/index': '/pages/home/template',
    '/pages/home/home': '/pages/home/template'
  };

  static isTab (url) {
    return this.tabUrls.some(path => path == url);
  }
  static mapUrl (url) {
    const type = wepy.$instance.globalData.shopType;
    if (type == 1 && this.mapUrls[url]) {
      return this.mapUrls[url];
    } else {
      return url;
    }
  }

  /**
   * 如果能够后退（多层），则navigaetBack，否则调用redirectTo
   */
  static backOrRedirect(url) {
    // url = this.mapUrl(url);
    if (this.isTab(url)) {
      wx.switchTab({
        url: url
      })
    } else {
      const pages = getCurrentPages();
      // route在低版本不兼容
      const index = pages.findIndex(item => ('/' + item.__route__) == url);
      if (pages.length < 2 || index < 0) {
        wx.redirectTo({
          url: url
        });
      } else {
        const delta = pages.length - 1 - index;
        wx.navigateBack({
          delta: delta
        });
      }
    }
  }
  /**
   * 如果能够后退（多层），则navigaetBack，否则调用navigateTo
   */
  static backOrNavigate(url) {
    // url = this.mapUrl(url);
    if (this.isTab(url)) {
      wx.switchTab({
        url: url
      })
    } else {
      const pages = getCurrentPages();
      // route在低版本不兼容
      const index = pages.findIndex(item => ('/' + item.__route__) == url);
      if (pages.length < 2 || index < 0) {
        wx.navigateTo({
          url: url
        });
      } else {
        const delta = pages.length - 1 - index;
        wx.navigateBack({
          delta: delta
        });
      }
    }
  }

  static wxPay(param) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...param,
        complete: res => {
          if (res.errMsg == 'requestPayment:ok') {
            resolve(res);
          } else {
            reject(res);
          }
        }
      });
    });
  }

  static wxGetLocation() {
    // let param = {}
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          resolve(res)
          // param.latitude = res.latitude
          // param.longitude = res.longitude
          // param.speed = res.speed
          // param.accuracy = res.accuracy
        },
        fail:function(res) {
          resolve(res)
        }
      })
    });
  }

  /**
   * 兼容性判断
   */
  static canIUse(str) {
    if (wx.canIUse) {
      return wx.canIUse(str);
    } else {
      return false;
    }
  }
  /**
   * 检查SDK版本
   */
  static isSDKExipred() {
    const {SDKVersion} = wx.getSystemInfoSync();
    console.info(`[version]sdk ${SDKVersion}`);
    return SDKVersion == null || SDKVersion < '1.2.0'
  }
  /**
   * 检查SDK版本
   */
  static checkSDK() {
    if (this.isSDKExipred()) {
      Tips.modal('您的微信版本太低，为确保正常使用，请尽快升级');
    }
  }
}
