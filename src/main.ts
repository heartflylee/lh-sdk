// import { setCookie, getCookie } from './utils/tools';

import { browser } from './browser';
import { getChannel } from './utils/storage';
import { Popup, Alert, Error } from './popup';
import HttpServ from './utils/http-service';

import "./assets/style/button.scss";

document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';
});
var coverSupport =
  'CSS' in window &&
  typeof CSS.supports === 'function' &&
  (CSS.supports('top: env(a)') || CSS.supports('top: constant(a)'));
// document.write(
//   '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
//     (coverSupport ? ', viewport-fit=cover' : '') +
//     '" />'
// );

let viewMeta = document.createElement('meta');
viewMeta.name = 'viewport';
viewMeta.content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' +
  (coverSupport ? ', viewport-fit=cover' : '');
document.getElementsByTagName('head')[0].appendChild(viewMeta);

class LhSdk {
  public isMobile: boolean;
  public options: any;
  constructor() {
    this.isMobile = browser().mobile;
    this.options = {
      channelLogin: false, // 是否调用渠道登录
      channelPay:false, // 是否调用渠道支付
    };
    this.initEnv();
  }

  alert() {
    new Alert('alert')
  }

  error() {
    new Error('error')
  }


  /**
   **初始化环境信息
   **/
  initEnv = () => {

    // 获取渠道信息
    getChannel();
  }


  /**
   **登录
   **/
  login = () => {
    if (this.options.channelLogin) {
      // 调用渠道登录方法
    } else {
      new Popup({});
    }
    // return new Promise()
  }

  /**
  **上报角色信息
  **/
  reportRoleInfo = (roleInfo) => {
    console.log(roleInfo);
    // 上报角色信息，调用接口
    // HttpServ.request({
    //   url: '/reportRoleInfo',
    //   method: 'post',
    //   data: {roleInfo}
    // })

  }

  /**
  **调起支付
  **/
  goRecharge = (preOrder) => {
    console.log(preOrder);
    if (this.options.channelPay) {
      // 调用渠道支付方法
    } else {
      new Popup({})
    }

  }

}
let lhsdk = new LhSdk();
(window as any).lhsdk = lhsdk;

lhsdk.error();
