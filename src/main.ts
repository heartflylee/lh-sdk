// import { setCookie, getCookie } from './utils/tools';

// import { browser, facility } from './browser';
// import { getChannel } from './utils/storage';
import { Popup, Toast } from './popup';
import HttpServ from './utils/http-service';

// import "./assets/style/button.scss";

// document.addEventListener('DOMContentLoaded', function () {
//   document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';
// });
// var coverSupport =
//   'CSS' in window &&
//   typeof CSS.supports === 'function' &&
//   (CSS.supports('top: env(a)') || CSS.supports('top: constant(a)'));
// document.write(
//   '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
//     (coverSupport ? ', viewport-fit=cover' : '') +
//     '" />'
// );

// let viewMeta = document.createElement('meta');
// viewMeta.name = 'viewport';
// viewMeta.content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
//   (coverSupport ? ', viewport-fit=cover' : '');
// document.getElementsByTagName('head')[0].appendChild(viewMeta);

class LhSdk {
  public options: any;
  baseUrl: string;
  toast: any;
  access: string;

  constructor() {
    // this.isMobile = browser().mobile;
    // this.facility = facility();
    this.options = {
      gameLogin: false, // 是否调用游戏登录
      gameLoginFnName: '', // 游戏登录方法
      gamePay: false, // 是否调用游戏支付
      gamePayFnName: '' // 游戏支付方法
    };

    this.toast = new Toast();


    // 是否为开发环境
    let isDevlopment = false;
    this.baseUrl = isDevlopment ? 'http://test.monkeygamer.com/' : 'http://h5sdk.monkeygamer.com/';

    // 渠道参数
    this.access = '';
    this.initEnv();
  }


  /**
   * 获取用户信息
   * @param config 
   * @param callback  回调函数 
   */
  getUserInfo(config, callback?: Function) {
    // 获取用户信息

    const isLogin = true;
    // 已登录
    if (isLogin) {

      callback && callback();
    } else {

      // 未登录
      this.login();

    }
  }

  /**
   **初始化环境信息
   **/
  initEnv = () => {

    // 获取渠道信息
    // 获取token

    // 设置是否调用游戏登录和支付方法标志位
    // 根据不同游戏获取登录方法和支付方法

    // 获取用户信息或判断token是否存在且可用
    this.getUserInfo({})
  }


  /**
   **登录
   **/
  login = () => {
    if (this.options.channelLogin) {
      // 调用游戏登录方法
      window[this.options.gameLoginFnName] && (window as any)[this.options.gameLoginFnName]();
    } else {
      // 跳转到登录页面
      window.location.href = this.baseUrl + 'login?A=' + this.access;

      // 渠道登录页面
      // window.location.href = this.baseUrl + 'chlogin?A=' + this.access+'&t=';
      

      // 调用iframe父级登录方法
      // window.parent.postMessage({type:'login'})

      // 弹框登录

    }
    // return new Promise()
  }

  /**
  **上报角色信息
  **/
  reportRoleInfo = (roleInfo) => {
    console.log(roleInfo);
    // 上报角色信息，调用接口
    HttpServ.request({
      url: '/reportRoleInfo',
      method: 'post',
      data: { roleInfo }
    }).then(() => {
      this.toast.success('上报成功');
    }).catch(() => {
      this.toast.error('接口报错');
    })

  }

  /**
  **调起支付
  **/
  goRecharge = (preOrder) => {
    console.log(preOrder);
    if (this.options.channelPay) {
      // 调用游戏支付方法
      window[this.options.gamePayFnName] && (window as any)[this.options.gamePayFnName]();
    } else {
      // 调用iframe父级支付方法
      window.parent.postMessage({ type: 'pay', orderId: preOrder })

      // 弹框支付

    }

  }

  // 实名认证
  identity() {
    window.parent.postMessage({type:'login'})
  }
}

(window as any).lhsdk = new LhSdk();
