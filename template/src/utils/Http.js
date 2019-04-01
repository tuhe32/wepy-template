import wepy from 'wepy';
import WxUtils from './WxUtils'

// HTTP工具类
export default class http {
  static baseUrl = wepy.$instance.globalData.baseUrl;
  static excludeUrl =  ['updateToken','user_reg'];//排除需要登录的url

  static async request (method, url, data, loading = true) {
    const param = {
      url: this.baseUrl+url,
      method: method,
      data: data
    };
    if (loading) {
      // Tips.loading();
    }
    console.info(`[http]request url=${url}`)
    const res = await wepy.request(param);
    if (this.isSuccess(res)) {
      // this.isNeedLogin(res);
      if(res.data){
        // return res.data.data?res.data.data:res.data;
        return res.data.data?res.data.data:"ok";
      }
    } else {
      let exUrl = this.excludeUrl.filter(m => url.indexOf(m) > -1)
      if(exUrl == null || exUrl == undefined || exUrl == ''){
        let resp = await this.isNeedLogin(res);
        console.log("resp-->",resp);
      }
      console.log("[数据异常]"+res.data.msg)
      return {"errMsg":res.data.msg};
      // return false;
      // return res
      // throw this.requestException(res);
    }
  }

  static async isNeedLogin (res) {
    const wxData = res.data;
    if(wxData.code == -1) {
      console.log("isNeedLogin,需要登录")
      WxUtils.backOrRedirect( "/pages/login");
      return true;
      // WxUtils.backOrNavigate()
    }else if(wxData.code == -404){
      console.log("token已过期,重新获取")
      //用户token过期,自动获取新的token
      let currentToken = wepy.getStorageSync("token");
      let currentUser = wepy.getStorageSync("user");
      if(currentToken && currentUser){
        let param = {
          "userId":currentUser.id,
          "tokenVal":currentToken
        }
        console.log("用户token过期",currentToken,currentUser.id);
        let newToken = await this.post('api/v1/login/updateToken',param).then(resp => resp);
        console.log("newToken", newToken);
        if(newToken != null) {
          if(newToken.errMsg){
            WxUtils.backOrRedirect("/pages/login");
            return true;
          }else{
            wepy.setStorage({key: 'token', data: newToken});
            WxUtils.backOrRedirect("/pages/index");
          }
        }else{
          WxUtils.backOrRedirect("/pages/login");
          return true;
        }
      }else{
        WxUtils.backOrRedirect("/pages/login");
        return true;
      }
    }
    return false;
  }


  /**
   * 判断请求是否成功
   */
  static isSuccess (res) {
    console.log("返回数据->",res)
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }
    const wxData = res.data;
    return !(wxData && wxData.code !== 0);
  }

  /**
   * 异常
   */
  static requestException (res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const serverData = wxData.data;
    if (serverData) {
      error.serverCode = wxData.code;
      error.message = serverData.message;
      error.serverData = serverData;
    }
    return error;
  }

  /**
   * 构造上传文件头部
   */
  static createAuthHeaderFile () {
    let token = wepy.$instance.globalData.token;
    const header = {};
    // header['Content-Type'] = 'multipart/form-data'
    if(token == null || token == undefined || token == '')
      token = wepy.getStorageSync("token")
    if (token) {
      header['token'] = token;
    }
    return header;
  }

  static get (url, data, loading = true) {
    return this.request('GET', url, data, loading);
  }

  static put (url, data, loading = true) {
    return this.request('PUT', url, data, loading);
  }

  static post (url, data, loading = true) {
    return this.request('POST', url, data, loading);
  }

  static patch (url, data, loading = true) {
    return this.request('PATCH', url, data, loading);
  }

  static delete (url, data, loading = true) {
    return this.request('DELETE', url, data, loading);
  }
}
