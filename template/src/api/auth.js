// import base from './base'
import http from '../utils/Http'
import wepy from 'wepy';
// import store from '../../store/utils';
import WxUtils from '../utils/WxUtils';
import api from './api'

/**
 * 权限服务类
 */
export default class auth {


  static async storageKey(key,value){
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData[key] = value;
  }

  /**
   * 获取用户信息
   */
  static async user(param = {block: false, redirect: false}, userInfo) {
    try {
      // 重新登录
      console.log("------user 获取用户信息-----");
      await this.doLogin();
      // 获取用户信息
      const rawUser =  await wepy.getUserInfo();
      console.log('[用户信息]',rawUser)
      // 解密信息
      let res = await this.decodeUserInfo(rawUser);
      const webUser = res.weixinUser
      console.log('保存后的用户',webUser)
      if(!webUser) return false;
      // // 保存登录信息
      await this.storageKey('user', webUser);
      return true;
    } catch (error) {
      console.error('[auth] 授权失败', error);
      if (param.block) {
        const url = `/pages/login?redirect=${param.redirect}`;
        if (param.redirect) {
          WxUtils.backOrRedirect(url);
        } else {
          WxUtils.backOrNavigate(url);
        }
      }
      return false;
    }
  }

  /**
   * 服务端解密用户信息
   */
  static async decodeUserInfo(rawUser,phone) {
    const param = {
      rawData: rawUser.rawData,
      signature: rawUser.signature,
      encryptedData: rawUser.encryptedData,
      iv: rawUser.iv,
    };
    console.log("解密param",param);
    return await api.apiWechatInfo(param);
  }

  /**
   * 执行登录操作
   */
  static async doLogin() {
    const {code} = await wepy.login();
    console.log('code',code)
    let token = await this.session(code);
    console.log('[获得token结果]',token)
    await this.storageKey('token',token)
    const tokenGlobal = wepy.$instance.globalData.token;
    if (tokenGlobal ==  null ||tokenGlobal == '' || tokenGlobal == undefined) {
      return
    }
  }

  static async doLogout(redirect=false) {
    wepy.$instance.globalData.token = null;
    wepy.$instance.globalData.user = null;
    await wepy.removeStorage({key: 'token'});
    await wepy.removeStorage({key: 'user'});
  }

  /**
   * 获取会话
   */
  static async session(jsCode) {
    return await api.apiWecahtLogin(jsCode);
  }

  /**
   * 获取店铺标识符
   */
  static getShopCode() {
    return wepy.$instance.globalData.appCode;
  }

  /**
   * 设置权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key];
  }

  /**
   * 检查是否存在权限制
   */
  static hasConfig(key) {
    const value = this.getConfig(key);
    return value != null && value != '';
  }

  /**
   * 读取权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData.auth[key] = value;
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`);
    wepy.$instance.globalData.auth[key] = null;
    await wepy.removeStorage({key: key});
  }
}
