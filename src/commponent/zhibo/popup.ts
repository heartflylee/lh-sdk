
// import { jsonp } from "@/utils/jsonp";
import axios from "axios";
import jsonpAdapter from 'axios-jsonp';


export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();// exp.toGMTString();
}
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else return null;
}

export function WJSOpenSDK_getUrl(name, url?) {
    url = url ? url : self.window.document.location.href;
    var start = url.indexOf(name + '=');
    if (start == -1) return '';
    var len = start + name.length + 1;
    var end = url.indexOf('&', len);
    if (end == -1) end = url.length;
    return url.substring(len, end);
}

export class Popup {
    public screenWidth;
    public screenHeight;
    public $container;
    public $window;
    public $shadow;
    public $closeBtn;
    constructor() {
        this.screenWidth = document.documentElement.clientWidth;
        this.screenHeight = document.documentElement.clientHeight;
    }


    show() {
        this.$container.show();
    }
    close() {
        this.$container.hide();
        setTimeout(() => {
            this.$container.remove();
        }, 0)
    }
}

export class Tooltip extends Popup {
    public defaults;
    public options;
    public width;
    constructor(opt) {
        super();

        this.defaults = {
            zIndex: 1000, //弹窗层级
            width: '75%', //弹窗宽度
            title: '提示', //弹窗title
            content: '',
            showCloas: false,
            cancelBtn: false, //取消按钮
            cancelCtx: '取消', //取消按钮
            confirmBtn: true, //确认按钮
            confirmBtnColor: '#007aff', //确定按钮颜色
            confirmCtx: '确定', //确认按钮
            timeout: 0, //自动关闭时长，为0时，不自动关闭
            shadowClick: false, //点击遮罩关闭
            cancelCallback: function cancelCallback() { }, //取消回调
            confirmCallback: function confirmCallback() { } //确认回调

        }

        this.options = Object.assign({}, this.defaults, opt);
    }

    creation() {
        let _this = this;

        this.width = Object.prototype.toString.call(this.options.width) === '[object String]' && this.options.width.indexOf('%') != -1 ? this.screenWidth * parseInt(this.options.width) / 100 : this.options.width;

        document.body.append(`<div class="z-container z-toast" style="z-index:${this.options.zIndex};">
        <div class="z-shadow"  style="z-index:${(this.options.zIndex + 1)};"></div>
        <div class="z-window" style="width: ${this.width}px;z-index:${(this.options.zIndex + 2)};">
        <h2 class="z-title">${this.options.title}</h2>
        <p style="margin-bottom:${(this.options.content ? '20px' : 0)}">${this.options.content}</p>
        <a class="z-close-window" style="display: ${(this.options.showCloas ? 'block' : 'none')};"></a>
        <div class="btns" style="display: ${(this.options.confirmBtn || this.options.cancelBtn ? 'flex' : 'none')};">
        <a class="z-close" style="display: ${(this.options.cancelBtn ? 'block' : 'none')};border-color: ${(this.options.cancelBtn ? '#e6e6e6' : '#fff')};">${this.options.cancelCtx}</a><a class="z-confirm" style="display: ${(this.options.confirmBtn ? 'block' : 'none')};color: ${this.options.confirmBtnColor}">${this.options.confirmCtx}</a></div></div></div>`)


        this.$container = document.body.querySelector('.z-toast:last-child');
        this.$window = this.$container.querySelector('.z-window');
        this.$shadow = this.$container.querySelector('.z-shadow');
        this.$closeBtn = this.$container.querySelector('.z-close-window');

        // 关闭弹框事件
        this.$container.querySelector('.z-close').addEventListener('click', function (event) {
            event.preventDefault();
            _this.close();
            _this.options.cancelCallback();
        })

        // 确认按钮事件
        this.$container.querySelector('.z-confirm').addEventListener('click', function (event) {
            event.preventDefault();
            _this.close();
            _this.options.confirmCallback();

        })

        this.show();

        this.$closeBtn.addEventListener('click', function (event) {
            event.preventDefault();
            _this.close();
        })

        // 自动关闭
        if (this.options.timeout) {
            setTimeout(function () {
                _this.close();
            }, this.options.timeout)
        }

        if (this.options.shadowClick) {
            this.$shadow.addEventListener('click', function (event) {
                event.preventDefault();
                _this.close();
            })
        }


    }
}

export const zhibo8Toast = (options) => {
    let tooltip = new Tooltip(options);
    tooltip.creation();
}



export class PcTooltip extends Popup {
    public defaults;
    public options;
    public width;
    public $title;
    public $content;
    constructor(opt) {
        super();
        this.defaults = {
            zIndex: 1000, //弹窗层级
            title: '提示', //弹窗title
            content: '',
            align: 'left',
            cancelBtn: true, //取消按钮
            cancelCtx: '取消', //取消按钮
            confirmBtn: true, //确认按钮
            confirmCtx: '确定', //确认按钮
            timeout: 0, //自动关闭时长，为0时，不自动关闭
            shadowClick: false, //点击遮罩关闭
            cancelCallback: function cancelCallback() { }, //取消回调
            confirmCallback: function confirmCallback() { } //确认回调

        }

        this.options = Object.assign({}, this.defaults, opt);
    }

    creation() {
        let _this = this;
        this.width = Object.prototype.toString.call(this.options.width) === '[object String]' && this.options.width.indexOf('%') != -1 ? this.screenWidth * parseInt(this.options.width) / 100 : this.options.width;
        document.body.append(`<div class="z-container z-pay" style="z-index:${this.options.zIndex};">
         <div class="z-shadow"  style="z-index:${(this.options.zIndex + 1)};"></div>
         <div class="z-window" style="width: ${this.width}px;z-index:${(this.options.zIndex + 2)};">
         <h2 class="z-title"></h2>
         <p class="z-content" style="text-align: ${this.options.align}"></p>
         <a class="z-close-window"></a>
         <div class="btns">
         <a class="z-error" style="display: ${(this.options.cancelBtn ? 'inline-block' : 'none')};">${this.options.cancelCtx}</a>
         <a class="z-success" style="display: ${(this.options.confirmBtn ? 'inline-block' : 'none')};">${this.options.confirmCtx}</a>
         </div>
         </div>
         </div>`);


        this.$container = document.body.querySelector('.z-pay:last-child');
        this.$window = this.$container.querySelector('.z-window');
        this.$title = this.$container.querySelector('.z-title');
        this.$content = this.$container.querySelector('.z-content');
        this.$shadow = this.$container.querySelector('.z-shadow');
        this.$closeBtn = this.$container.querySelector('.z-close-window');

        this.$title.html(this.options.title);
        this.$content.html(this.options.content);

        let clientWidth = 750;

        let browser = function () {
            let u = navigator.userAgent;
            return {
                // 移动端浏览器版本信息
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0, // 是否为移动终端
                iPad: u.indexOf('iPad') > -1 // 是否 iPad
            }
        }

        if (browser().mobile && !browser().iPad) clientWidth = 1920;

        let deviceWidth = document.documentElement.clientWidth <= clientWidth ? document.documentElement.clientWidth : clientWidth;
        this.$container.get(0).style.fontSize = 100 * (deviceWidth / 750) + 'px';

        this.$container.querySelector('.z-error').addEventListener('click', function (event) {
            event.preventDefault();
            _this.close();
            _this.options.cancelCallback();
        })


        this.$container.querySelector('.z-success').addEventListener('click', function (event) {
            event.preventDefault();
            _this.close();
            _this.options.confirmCallback();
        })

        this.show();

        this.$closeBtn.addEventListener('click', function (event) {
            event?.preventDefault();
            _this.close();
        })

        //  自动关闭
        if (this.options.timeout) {
            setTimeout(function () {
                _this.close();
            }, this.options.timeout)
        }

        if (this.options.shadowClick) {
            this.$shadow.addEventListener('click', function (event) {
                event.preventDefault();
                _this.close();
            })
        }

    }
}

export const zhibo8PcToast = (options) => {
    let tooltip = new PcTooltip(options);
    tooltip.creation();
}



let zhibo8TestEnvironment = false;
let zhibo8Environment = zhibo8TestEnvironment ? 'gameh5test2019' : 'gameh5';


export let facility = (function () {
    let browser = function () {
        let u = navigator.userAgent;
        return {
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0 && u.indexOf('Macintosh') < 0,  // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),  // iOS终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  // Android 终端或者 UC 浏览器
            iPad: u.indexOf('iPad') > -1,   // 是否 iPad
        }
    }();




    if (!browser.mobile) {
        return 'pc';
    }
    else if (browser.ios) {
        return 'ios';
    }
    else if (browser.android) {
        return 'android'
    } else {
        return 'mobile'
    }


})();



window.onload = function () {
    if ((facility === 'ios' && (!(window as any).webkit?.messageHandlers?.AppJavaScriptMessageHandler?.postMessage)) || (facility === 'android' && (!(window as any).zhibo8Act?.share))) {
        facility = 'mobile';
    }

    document.querySelector('#tips') && ((document.querySelector('#tips') as any).textContent = navigator.userAgent);
}

// 客户端支付回调方法
export let zhibo8PayCallbackMethod = () => { }
(window as any).zhibo8PayCallbackMethod = zhibo8PayCallbackMethod;
// 客户端登陆回调方法

export let zhibo8LoginCallbackMethod = () => {
    if (facility !== 'ios') return;

    document.body.append(`<div id="zLoading" class="z-loading" style=""><p><b></b>登录成功，正在获取用户信息<span>...</span></p></div>`);

    let dottedTimer = setInterval(function () {
        let dots = document.querySelector('#zLoading span')?.textContent;
        if (dots === '...') {
            dots = '.';
        } else {
            dots += '.';
        }

        document.querySelector('#zLoading span') && ((document.querySelector('#zLoading span') as any).textContent = dots);
    }, 500)


    let timeCount = 0;
    let cookieTimer = setInterval(function () {
        timeCount++;

        let cookies = getCookie('Example_auth');
        if (cookies) {
            window.location.reload();
        } else if (timeCount > 15) {
            clearInterval(cookieTimer);
            zhibo8Toast({
                zIndex: 110,  //弹窗层级
                width: '80%',  //弹窗默认宽度
                title: '\u7528\u6237\u4fe1\u606f\u83b7\u53d6\u8d85\u65f6\uff0c\u8bf7\u91cd\u65b0\u6253\u5f00\u6e38\u620f',  //弹窗title
                content: '',  //消息内容
                confirmCallback: function () {
                    try {
                        (window as any).webkit?.messageHandlers?.AppJavaScriptMessageHandler?.postMessage({ type: 3, data: { close: true } });
                    } catch (e) {
                        window.location.reload();
                    }
                },
            })
        }
    }, 1000)
}
( window as any).zhibo8LoginCallbackMethod = zhibo8LoginCallbackMethod;


/**
 * 调起登陆界面
 * @constructor
 */

export let WJSOpenSDK_toLogin = (appid) => {
    let paramsObj = {
        appid: appid || 27,
        redirect_url: 'https://h5nba-ly.ftxgame.com/p/main/zbb_index'

    }

    let paramsStr = JSON.stringify(paramsObj);
    try {
        (window as any).webkit.messageHandlers?.Zhibo8LoginAction?.postMessage(paramsObj);
    } catch (e) {
        try {
            (window as any).zhibo8Act.login(paramsStr);
        } catch (e) {
            try {
                (window as any).zhibo8Act.act('to_login', '登录');
            } catch (e) {
                // $('body').zhibo8Toast({title: '请在客户端登录'});
                // $('body').zhibo8Login();
                console.info(e);
                if (facility == 'pc') {
                    parent.location.href = 'https://home.zhibo8.cc/?goback=1';
                } else {
                    parent.location.href = 'https://home.zhibo8.cc/wap/login/mobile_login.html?goback=1';
                }
            }
        }
    }
}


/**
 * 获取用户信息前先取得token
 * @param config
 * @param callback  回调吐出token
 * @constructor
 */
export let WJSOpenSDK_userToken = (config, callback) => {


    axios({
        url: facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?_platform=ios&app_id=" + config.app_id : "https://pl.zhibo8.cc/game/get_token.php?app_id=" + config.app_id,
        adapter: jsonpAdapter,
    })
    .then((data: any) => {

        // })
        //     ajax({
        //         url: facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?_platform=ios&app_id=" + config.app_id : "https://pl.zhibo8.cc/game/get_token.php?app_id=" + config.app_id,
        //         type: "GET",
        //         dataType: "jsonp",
        //         success: function (data) {

        if (data['status'] == 'success') {
            if (data['data']['first_visit']) {
                try {
                    // ios
                    (window as any).webkit.messageHandlers.Zhibo8WebExitText.postMessage({ msg: '“王者NBA”可以点击主页顶部头像在“发现”频道中再次访问。', btn: '知道了' });
                    // localStorage.setItem('firstExitZhibo8Game', '1');
                    // setCookie('firstExitZhibo8Game', '1')
                } catch (e) {
                    try {
                        // 安卓
                        (window as any).zhibo8Act.exitText('知道了', '“王者NBA”可以点击主页顶部头像在“发现”频道中再次访问。');
                        // localStorage.setItem('firstExitZhibo8Game', '1');
                        // setCookie('firstExitZhibo8Game', '1')
                    } catch (e) {
                        console.warn(e);
                    }
                }
            }
            callback(data['data']['token']);
        } else {
            WJSOpenSDK_toLogin(config.app_id);//未登陆获取token失败，调起登陆页面
        }

    });
}




var permitToDeductMoney = true;  //允许支付
/**
 * 吧币扣款(不足跳转充值页面)
 * @param config object {out_trade_no,app_id,price}  out_trade_no(合作方订单号)
 * @param callback 回调函数，扣款成功执行回调函数
 * @constructor
 */
export function WJSOpenSDK_deductMoney(config, callback) {
    if (!permitToDeductMoney) return;
    permitToDeductMoney = false;
    // var hasDirectPayment = (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Zhibo8RechargeAction) || (window.zhibo8Act && window.zhibo8Act.payDialog);
    // var hasPayAction = (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.Zhibo8RechargeAction) || (window.zhibo8Act && window.zhibo8Act.payDialog);

    // if (hasPayAction && !hasDirectPayment) {
    zhibo8BuyAddiction(config.app_id, function () {
        if (facility == 'ios' || facility == 'android') {
            if ((window as any).webkit?.messageHandlers && (window as any).webkit?.messageHandlers?.Zhibo8PayMethod) {
                getPaymentMethod(config, facility);
            } else if (((window as any).zhibo8Act?.payMethod)) {
                getPaymentMethod(config, facility);
            } else {
                getZhibo8Token(config.app_id, function (token, native_pay) {
                    config.token = token;
               
                    axios({
                        url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/payable?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/payable", 
                        params:{ token: config.token, price: config.price, app_id: config.app_id },
                        adapter: jsonpAdapter,
                    })
                    .then((data: any) => {

                        // })
                        // $.ajax({
                        //     url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/payable?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/payable",
                        //     type: "GET",
                        //     data: { token: config.token, price: config.price, app_id: config.app_id },
                        //     dataType: "jsonp",
                        //     success: function (data) {
                        permitToDeductMoney = true;
                        if (data['status'] == 'success') {
                            if (data['data']['payable'] == true) {
                                zhibo8Toast({
                                    zIndex: 110,  //弹窗层级
                                    width: '75%',  //弹窗默认宽度
                                    title: '\u5427\u5e01\u5145\u8db3\uff0c\u662f\u5426\u7acb\u5373\u8d2d\u4e70',  //弹窗title
                                    content: '',  //消息内容
                                    cancelBtn: true,
                                    confirmCallback: function () {
                                        getZhibo8Token(config.app_id, function (token) {
                                            config.token = token;
                                            // jsonp(
                                            //     facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/buy?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/buy", 
                                            //     { token: config.token, price: config.price, out_trade_no: config.out_trade_no, app_id: config.app_id },)
                                                
                                                axios({
                                                    url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/buy?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/buy", 
                                                    params:{ token: config.token, price: config.price, out_trade_no: config.out_trade_no, app_id: config.app_id },
                                                    adapter: jsonpAdapter,
                                                })
                                                .then((data: any) => {

                                                // })
                                                // $.ajax({
                                                //     url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/buy?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/buy",
                                                //     type: "GET",
                                                //     data: { token: config.token, price: config.price, out_trade_no: config.out_trade_no, app_id: config.app_id },
                                                //     dataType: "jsonp",
                                                //     success: function (data) {
                                                if (data['status'] == 'success') {
                                                    callback();
                                                }
                                                // }
                                            });
                                        })


                                    },
                                });
                            } else {
                                zhibo8Toast({
                                    zIndex: 110,  //弹窗层级
                                    width: '75%',  //弹窗默认宽度
                                    title: '\u5427\u5e01\u4e0d\u8db3\uff0c\u662f\u5426\u5145\u503c',  //弹窗title
                                    content: '',  //消息内容
                                    // timeout: 0,   //自动关闭时长毫秒，为0时，不自动关闭，默认0
                                    // shadowClick: false,  //是否允许点击遮罩关闭，默认false
                                    cancelBtn: true,
                                    // cancelCallback: function() {
                                    //     console.log(321)
                                    // },
                                    confirmCallback: function () {
                                        var paramsObj = { appid: config.app_id, redirect_url: '', js_callback: '' };
                                        if (config.url) {
                                            paramsObj.redirect_url = config.url;
                                        } else {
                                            paramsObj.js_callback = 'zhibo8PayCallbackMethod()';
                                        }
                                        var paramsStr = JSON.stringify(paramsObj)

                                        var zb8pos = WJSOpenSDK_getUrl('zb8pos');
                                        if (zb8pos == 'splash') {
                                            WJSOpenSDK_toPay(config);
                                            return;
                                        }
                                        switch (facility) {
                                            case 'ios':
                                                try {
                                                    (window as any).webkit?.messageHandlers?.Zhibo8PayAction?.postMessage(paramsObj);
                                                } catch (e) {
                                                    // WJSOpenSDK_toPay(config);
                                                    zhibo8Toast({ title: '充值异常' });
                                                }
                                                break;
                                            case 'android':
                                            case 'other':
                                            default:
                                                try {
                                                    (window as any).zhibo8Act?.payAction(paramsStr);
                                                } catch (e) {
                                                    if (native_pay) {
                                                        (window as any).zhibo8Act?.act("pay", paramsStr);
                                                    } else {
                                                        WJSOpenSDK_toPay(config)
                                                    }
                                                }
                                                break;
                                        }
                                    }
                                });
                            }
                        }
                        // },
                        // error: function (res) {
                        //     permitToDeductMoney = true;
                        // }
                    }).catch((res) => {
                        permitToDeductMoney = true;
                    })
                })
            }
        } else {
            zhibo8DirectPayment(config, callback)
        }
    })
}
/**
 * 获取支付方式
 * 
 * */
export function getPaymentMethod(config, os) {
    getZhibo8Token(config.app_id, function (token) {

        // jsonp('https://wanjiashe.com/' + zhibo8Environment + '/applyOrderH5', {
        //     os: os,
        //     token: token,
        //     price: config.price,
        //     out_trade_no: config.out_trade_no,
        //     app_id: config.app_id
        // })
        axios({
            url: 'https://wanjiashe.com/' + zhibo8Environment + '/applyOrderH5',
            params:{
                os: os,
                token: token,
                price: config.price,
                out_trade_no: config.out_trade_no,
                app_id: config.app_id
            },
            adapter: jsonpAdapter,
        })
        .then((data: any) => {

            // })
            // $.ajax({
            //     url: 'https://wanjiashe.com/' + zhibo8Environment + '/applyOrderH5',
            //     type: 'get',
            //     data: {
            //         os: os,
            //         token: token,
            //         price: config.price,
            //         out_trade_no: config.out_trade_no,
            //         app_id: config.app_id
            //     },
            //     dataType: "jsonp",
            //     success: function (data) {
            if (data['status'] == 'success') {
                var paramsObj = data.data.pay;
                paramsObj['appid'] = config.app_id;
                if (config.url) {
                    paramsObj.redirect_url = config.url;
                } else {
                    paramsObj.js_callback = 'zhibo8PaymentMethodCallback(1)';
                }
                var paramsStr = JSON.stringify(paramsObj)
                if (os == 'ios') {
                    (window as any).webkit?.messageHandlers?.Zhibo8PayMethod?.postMessage(paramsObj);
                } else {
                    (window as any).zhibo8Act?.payMethod(paramsStr);
                }
                permitToDeductMoney = true;
            } else {
                permitToDeductMoney = true;
                zhibo8Toast({ title: data['msg'] || '请求失败' });
            }
            // },
            // error: function () {
            //     permitToDeductMoney = true;
            //     zhibo8Toast({ title: '请求失败' });
            // }
        }).catch(() => {
                 permitToDeductMoney = true;
                zhibo8Toast({ title: '请求失败' });
        })
    });
}
/**
 * 客户端选择付款方式的回调
 */
export function zhibo8PaymentMethodCallback(bool) {
    if (bool == 1) {
        zhibo8Toast({ title: '支付成功' });
    }
    permitToDeductMoney = true;
}

/**
 * 调起充值页面
 * @param config object{token,app_id,product_id}  product_id(充值编号)
 * @constructor
 */
export function WJSOpenSDK_toPay(config) {
    window.location.href = facility == 'ios' ? "https://www.wanjiashe.com/currency/?_platform=ios&appId=" + config.app_id : "https://www.wanjiashe.com/currency/?appId=" + config.app_id;
}

/**
 * Created by 先生 on 2019/5/13.
 */

let zhibo8DirectObj: any = {};
/**
 * [zhibo8DirectPayment 直接调用支付方法]
 * @param  {[type]} config [配置]
 * @param  {[type]} config.app_id [app_id]
 * @param  {[type]} config.out_trade_no [订单号]
 * @param  {[type]} config.price [金额]
 * @param  {[type]} fn [游戏回调方法]
 * @return {[type]}        [description]
 */
export function zhibo8DirectPayment(config, fn) {
    zhibo8DirectObj.app_id = config.app_id;
    zhibo8DirectObj.out_trade_no = config.out_trade_no;
    zhibo8DirectObj.price = config.price;
    zhibo8DirectObj.callback = fn;  //记录游戏回调函数，充值成功后回调

    getZhibo8PaymentParams(config, facility, function (data) {
        zhibo8H5DirectToPay(config, data, fn);
    })
    // switch (facility) {
    //     case 'ios':
    //         getZhibo8PaymentParams(config, 'ios', function(data) {
    //             // data.js_callback = "zhibo8DirectPaymentCallback()";
    //             try {
    //                 window.webkit.messageHandlers.Zhibo8RechargeAction.postMessage(data);
    //             } catch(e) {
    //                 console.log(e)
    //                 // 走跳转充值页流程
    //                 zhibo8H5DirectToPay(config, data, fn);
    //             }
    //         })
    //         break;
    //     case 'android':
    //         getZhibo8PaymentParams(config, 'android', function(data) {
    //             // data.js_callback = "zhibo8DirectPaymentCallback()";
    //             var paramsStr = JSON.stringify(data);
    //             console.log(paramsStr)
    //             try {
    //                 window.zhibo8Act.payDialog(paramsStr);
    //             } catch(e) {
    //                 console.log(e)
    //                 // 走跳转充值页流程
    //                 zhibo8H5DirectToPay(config, data, fn);
    //             }
    //         })
    //         break;
    //     case 'other':
    //     default:
    //         getZhibo8PaymentParams(config, facility, function(data) {
    //             zhibo8H5DirectToPay(config, data, fn);
    //         })
    //         break;
    // }


}
/**
 * [getZhibo8PaymentParams 获取支付信息]
 * @param  {[type]}   config [订单信息]
 * @param  {[type]}   os     [系统]
 * @param  {Function} fn     [回调]
 * @return {[type]}          [description]
 */
export function getZhibo8PaymentParams(config, os, fn) {
    console.log(config, os)
    getZhibo8Token(config.app_id, function (token) {
        // jsonp(facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/rechargeAndBuy?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/rechargeAndBuy", {
        //     os: os,
        //     token: token,
        //     price: config.price,
        //     out_trade_no: config.out_trade_no,
        //     app_id: config.app_id,
        //     js_callback: "zhibo8DirectPaymentCallback()",
        // })
        axios({
            url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/rechargeAndBuy?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/rechargeAndBuy",
            params:{
                os: os,
                token: token,
                price: config.price,
                out_trade_no: config.out_trade_no,
                app_id: config.app_id,
                js_callback: "zhibo8DirectPaymentCallback()",
            },
            adapter: jsonpAdapter,
        })
        .then((data: any) => {

            // })
            // $.ajax({
            //     url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/rechargeAndBuy?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/rechargeAndBuy",
            //     type: "GET",
            //     dataType: "jsonp",
            //     data: {
            //         os: os,
            //         token: token,
            //         price: config.price,
            //         out_trade_no: config.out_trade_no,
            //         app_id: config.app_id,
            //         js_callback: "zhibo8DirectPaymentCallback()",
            //     },
            //     success: function (data) {
            if (data.status == 'success') {
                fn(data.data)
            } else {
                zhibo8Toast({ title: data.msg });
            }
            // }
        });
    })

}
/**
 * [getZhibo8Token 公用获取token方法]
 * @param  {[type]}   appid [appid]
 * @param  {Function} fn    [回调函数]
 * @return {[type]}         [description]
 */
export function getZhibo8Token(appid, fn) {
    // jsonp(
    //     facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?app_id=" + appid,
    //      {})
    
    
    axios({
        url:facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?app_id=" + appid,
        params:{
           
        },
        adapter: jsonpAdapter,
    })
    .then((data: any) => {


    
        // })
        // $.ajax({
        //     url: facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?app_id=" + appid,
        //     type: "GET",
        //     dataType: "jsonp",
        //     success: function (data) {
        if (data.status == 'success') {
            fn(data.data.token, data.data.native_pay);
        } else if (data.info == '用户未登录') {
            permitToDeductMoney = true;
            WJSOpenSDK_toLogin(appid);
        }
        // },
        // error: function (res) {
        //     permitToDeductMoney = true;
        // }
    }).catch(res => {
        permitToDeductMoney = true;
    })
}

/**
 * [zhibo8DirectPaymentCallback 调起支付回调]
 * @param  {[type]} appid [description]
 * @param  {[type]} outno [description]
 * @return {[type]}       [description]
 */
export function zhibo8DirectPaymentCallback() {

    zhibo8Toast({
        zIndex: 110,  //弹窗层级
        width: '80%',  //弹窗默认宽度
        title: '\u8d2d\u4e70\u9053\u5177\u4e2d\uff0c\u8bf7\u52ff\u5173\u95ed\u6e38\u620f',
        content: '',  //消息内容
        confirmBtn: false,
    });

    let countTime = 0;  //计时器
    intervalRequest();
    let timer: any = setInterval(intervalRequest, 1000);

    function intervalRequest() {
        countTime++;
        if (countTime > 6 && timer) {
            clearInterval(timer);
            timer = undefined;
            (document.body.querySelector('.z-container:last-child') as HTMLElement).style.display = 'none';
            // $('.z-container:last-child', 'body').hide();
            setTimeout(function () {
                (document.body.querySelector('.z-container:last-child') as HTMLElement).remove();
                // $('.z-container:last-child', 'body').remove();

                zhibo8Toast({
                    zIndex: 110,  //弹窗层级
                    width: '70%',  //弹窗默认宽度
                    title: '\u652f\u4ed8\u5f02\u5e38\uff0c\u5982\u5df2\u652f\u4ed8\u8bf7\u70b9\u51fb\u201c\u91cd\u8bd5\u201d', //支付异常，如已支付请点击“重试”
                    content: '\u82e5\u8d2d\u4e70\u4e00\u76f4\u672a\u6210\u529f\uff0c\u8bf7\u70b9\u51fb\u53cd\u9988\u4e0e\u6211\u4eec\u8054\u7cfb',  //若购买一直未成功，请点击反馈与我们联系
                    cancelBtn: true,
                    cancelCtx: '\u53cd\u9988',
                    showCloas: true,
                    cancelCallback: function () {
                        try {
                            (window as any).webkit?.messageHandlers?.Zhibo8FeedbackAction?.postMessage();
                        } catch (e) {
                            try {
                                (window as any).zhibo8Act?.feedback();
                            } catch (e) {
                                window.open('https://m.zhibo8.cc/feedback/?out_trade_no=' + zhibo8DirectObj.out_trade_no, 'feedback');
                            }
                        }
                    },
                    confirmCtx: '\u91cd\u8bd5',
                    confirmBtnColor: '#333',
                    confirmCallback: zhibo8DirectPaymentCallback,
                });
            }, 0);
        } else {
            getZhibo8Token(zhibo8DirectObj.app_id, function (token) {
                // jsonp(facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/orderStatus?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/orderStatus", {
                //     token: token,
                //     out_trade_no: zhibo8DirectObj.out_trade_no,
                //     app_id: zhibo8DirectObj.app_id,
                // })
                
                axios({
                    url:facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/orderStatus?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/orderStatus",
                    params:{
                        token: token,
                    out_trade_no: zhibo8DirectObj.out_trade_no,
                    app_id: zhibo8DirectObj.app_id,
                    },
                    adapter: jsonpAdapter,
                })
                .then((res: any) => {

                    // })
                    // $.ajax({
                    //     url: facility == 'ios' ? "https://wanjiashe.com/" + zhibo8Environment + "/orderStatus?_platform=ios" : "https://wanjiashe.com/" + zhibo8Environment + "/orderStatus",
                    //     type: "GET",
                    //     dataType: "jsonp",
                    //     data: {
                    //         token: token,
                    //         out_trade_no: zhibo8DirectObj.out_trade_no,
                    //         app_id: zhibo8DirectObj.app_id,
                    //     },
                    //     success: function (res) {
                    if (res.status != 'success') return;
                    if (res.data.order_status == 'success') {
                        clearInterval(timer);
                        (document.body.querySelector('.z-container:last-child') as HTMLElement).style.display = 'none';
                        // $('.z-container:last-child', 'body').hide();
                        setTimeout(function () {
                            (document.body.querySelector('.z-container:last-child') as HTMLElement).remove();
                            // $('.z-container:last-child', 'body').remove();
                            zhibo8DirectObj.callback();
                        }, 0);
                    } else if (countTime > 5) {
                        clearInterval(timer);
                        timer = undefined;
                        (document.body.querySelector('.z-container:last-child') as HTMLElement).style.display = 'none';
                        // $('.z-container:last-child', 'body').hide();
                        setTimeout(function () {
                            (document.body.querySelector('.z-container:last-child') as HTMLElement).remove();
                            // $('.z-container:last-child', 'body').remove();

                            zhibo8Toast({
                                zIndex: 110,  //弹窗层级
                                width: '70%',  //弹窗默认宽度
                                title: res.data.alert_title,
                                content: res.data.alert_content,  //消息内容
                                cancelBtn: true,
                                cancelCtx: '\u53cd\u9988',
                                showCloas: true,
                                cancelCallback: function () {
                                    try {
                                        (window as any).webkit?.messageHandlers?.Zhibo8FeedbackAction?.postMessage();
                                    } catch (e) {
                                        try {
                                            (window as any).zhibo8Act?.feedback();
                                        } catch (e) {
                                            window.open('https://m.zhibo8.cc/feedback/?out_trade_no=' + zhibo8DirectObj.out_trade_no, 'feedback');
                                        }
                                    }
                                },
                                confirmCtx: '\u91cd\u8bd5',
                                confirmBtnColor: '#333',
                                confirmCallback: zhibo8DirectPaymentCallback,
                            });
                        }, 0);
                    }
                    // }
                })
            })
        }
    }
}

(window as any).zhibo8DirectPaymentCallback = zhibo8DirectPaymentCallback;


/**
 * [zhibo8H5DirectToPay 调起充值]
 * @param  {[type]}   config [配置参数]
 * @param  {[type]}   data   [返回数据]
 * @param  {Function} fn     [回调函数]
 * @return {[type]}          [description]
 */
export function zhibo8H5DirectToPay(config, data, fn) {
    permitToDeductMoney = true;
    if (data.pay_url) {
        var content = facility == 'pc' ? '\u002a\u5f53\u524d\u4ec5\u652f\u6301\u652f\u4ed8\u5b9d\u5145\u503c' : '\u002a\u5145\u503c\u5b8c\u6210\u8bf7\u5728\u6e38\u620f\u5237\u65b0\u540e\u67e5\u770b\u9053\u5177\u662f\u5426\u5230\u8d26</br>\u002a\u5f53\u524d\u4ec5\u652f\u6301\u652f\u4ed8\u5b9d\u5145\u503c'
        var align = facility == 'pc' ? 'center' : 'left';

        zhibo8PcToast({
            zIndex: 110,  //弹窗层级
            width: '70%',  //弹窗默认宽度
            title: '\u9700\u652f\u4ed8<em>' + config.price + '</em>\u5143',
            content: content,  //*当前仅支持支付宝充值
            align: align,
            cancelBtn: true,
            confirmBtn: true,
            cancelCtx: '\u53d6\u6d88',  //取消
            confirmCtx: '\u652f\u4ed8\u5b9d\u5145\u503c',  //支付宝充值
            cancelCallback: function () {

            },
            confirmCallback: function () {
                // if (facility == 'pc') {
                //     window.open(data.pay_url, 'zhibo8pay');  //pc端新窗口打开
                //     zhibo8H5DirectToPayPopup(config, fn);
                // } else {
                //     location.href = data.pay_url;  //wap当前页打开
                // }
                window.open(data.pay_url, 'zhibo8pay');  //pc端新窗口打开
                zhibo8H5DirectToPayPopup(config, fn);
            },
        });
    }
}

export function zhibo8H5DirectToPayPopup(config, fn) {
    zhibo8PcToast({
        zIndex: 110,  //弹窗层级
        width: '70%',  //弹窗默认宽度
        title: '\u652f\u4ed8\u7ed3\u679c',  //支付结果
        content: '\u8bf7\u5728\u65b0\u6253\u5f00\u7684\u9875\u9762\u5b8c\u6210\u652f\u4ed8\uff0c\u4ed8\u6b3e\u5b8c\u6210\u540e\u8bf7\u70b9\u51fb\u201c\u652f\u4ed8\u6210\u529f\u201d',  //请在新打开的页面完成支付，付款完成后请点击“支付成功”
        align: 'center',
        cancelBtn: true,
        confirmBtn: true,
        cancelCtx: '\u652f\u4ed8\u9047\u5230\u95ee\u9898',  //支付遇到问题
        confirmCtx: '\u652f\u4ed8\u6210\u529f',  //支付成功
        cancelCallback: function () {
            window.open('https://m.zhibo8.cc/feedback/?out_trade_no=' + config.out_trade_no, 'feedback');
        },
        confirmCallback: function () {
            zhibo8DirectPaymentCallback();
        },
    });
}

let zhibo8Timer: any = undefined;
let zhibo8ChildTimer: any = undefined;

//直播吧反沉迷机制--进入游戏
// zhibo8LoginAddiction(29);
export function zhibo8LoginAddiction(appid) {
    // jsonp(facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&app_id=" + appid, {})
    
    axios({
        url:facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&app_id=" + appid,
        params:{
           
        },
        adapter: jsonpAdapter,
    })
    .then((data: any) => {

        // })
        // $.ajax({
        //     url: facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&app_id=" + appid,
        //     type: "GET",
        //     dataType: "jsonp",
        //     success: function (data) {
        if (data.status == 'success') {
            var device = data.data.device;
            // jsonp("https://wanjiashe.com/" + zhibo8Environment + "/isAuthenticate", 
            // { "app_id": appid, "en_uid": data.data.en_uid, "device": device },)
            
            axios({
                url:"https://wanjiashe.com/" + zhibo8Environment + "/isAuthenticate", 
                params:{ "app_id": appid, "en_uid": data.data.en_uid, "device": device },
                adapter: jsonpAdapter,
            })
            .then((data: any) => {

                // })
                // $.ajax({
                //     url: "https://wanjiashe.com/" + zhibo8Environment + "/isAuthenticate",
                //     type: "GET",
                //     data: { "app_id": appid, "en_uid": data.data.en_uid, "device": device },
                //     dataType: "jsonp",
                //     success: function (data) {
                if (data.status == 'success') {
                    if (data.data.is_auth === 0) {
                        if (data.data.act == 'authenticate') {
                            //实名认证弹窗
                            antiWallow.init(data.data.persist_token);
                            return;
                        }
                        //未实名试玩
                        if (typeof zhibo8Timer == "undefined") {
                            var tipsTimeArr = {
                                '15': '\u8bd5\u73a9\u5269\u4f59\u65f6\u95f4\u4e3a\uff1a15\u5206\u949f\uff0c\u8bd5\u73a9\u7ed3\u675f\u540e\u5c06\u8fdb\u884c\u5b9e\u540d\u8ba4\u8bc1',
                                '10': '\u8bd5\u73a9\u5269\u4f59\u65f6\u95f4\u4e3a\uff1a10\u5206\u949f\uff0c\u8bd5\u73a9\u7ed3\u675f\u540e\u5c06\u8fdb\u884c\u5b9e\u540d\u8ba4\u8bc1',
                                '5': '\u8bd5\u73a9\u5269\u4f59\u65f6\u95f4\u4e3a\uff1a5\u5206\u949f\uff0c\u8bd5\u73a9\u7ed3\u675f\u540e\u5c06\u8fdb\u884c\u5b9e\u540d\u8ba4\u8bc1'
                            }
                            zhibo8Timer = setInterval(function () {
                                // jsonp("https://wanjiashe.com/" + zhibo8Environment + "/addTime",
                                //  { "app_id": appid, "persist_token": data.data.persist_token, "device": device },)
                                
                                 axios({
                                    url:"https://wanjiashe.com/" + zhibo8Environment + "/addTime",
                                    params:{ "app_id": appid, "persist_token": data.data.persist_token, "device": device },
                                    adapter: jsonpAdapter,
                                })
                                
                                .then((res: any) => {

                                    // })
                                    // $.ajax({
                                    //     url: "https://wanjiashe.com/" + zhibo8Environment + "/addTime",
                                    //     type: "GET",
                                    //     data: { "app_id": appid, "persist_token": data.data.persist_token, "device": device },
                                    //     dataType: "jsonp",
                                    //     success: function (res) {
                                    if (res.status == 'success' && res.data.act == 'authenticate') {
                                        clearInterval(zhibo8Timer);
                                        //实名认证弹窗
                                        antiWallow.init(data.data.persist_token);
                                    } else if (tipsTimeArr[res.data.rest_time]) {
                                        //剩余试玩时长toast提示
                                        antiWallow.toastTip(document.body, tipsTimeArr[res.data.rest_time]);
                                    }
                                    // }
                                })
                            }, 1000 * 60)
                        }
                    } else if (data.data.is_adulth == 0) {
                        //未成年强制退出
                        if (data.data.child_duration_rest == 0) {
                            antiWallow.exit(data.data.tips);
                        } else if (typeof zhibo8ChildTimer == "undefined") {
                            zhibo8ChildTimer = setInterval(function () {
                                // jsonp("https://wanjiashe.com/" + zhibo8Environment + "/childAddTime", 
                                // { "app_id": appid, "persist_token": data.data.persist_token, "device": device },)
                                axios({
                                    url:"https://wanjiashe.com/" + zhibo8Environment + "/childAddTime", 
                                    params:{ "app_id": appid, "persist_token": data.data.persist_token, "device": device },
                                    adapter: jsonpAdapter,
                                })
                                .then((res: any) => {

                                    // })
                                    // $.ajax({
                                    //     url: "https://wanjiashe.com/" + zhibo8Environment + "/childAddTime",
                                    //     type: "GET",
                                    //     data: { "app_id": appid, "persist_token": data.data.persist_token, "device": device },
                                    //     dataType: "jsonp",
                                    //     success: function (res) {
                                    if (res.status == 'success' && res.data.child_duration_rest == 0) {
                                        clearInterval(zhibo8ChildTimer);
                                        //强制退出
                                        antiWallow.exit(data.data.tips);
                                    }
                                    // }
                                })
                            }, 1000 * 60)
                        }
                    }
                }
                // }
            })

        }
        // }
    })
}
//直播吧反沉迷机制--充值
export function zhibo8BuyAddiction(appid, cb) {
    // jsonp(facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&app_id=" + appid, {})
    
    axios({
        url:facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&app_id=" + appid,
        params:{  },
        adapter: jsonpAdapter,
    })
    .then((data: any) => {

        // })
        // $.ajax({
        //     url: facility == 'ios' ? "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&_platform=ios&app_id=" + appid : "https://pl.zhibo8.cc/game/get_token.php?is_fcm=1&app_id=" + appid,
        //     type: "GET",
        //     dataType: "jsonp",
        //     success: function (data) {

        // jsonp("https://wanjiashe.com/" + zhibo8Environment + "/isAuthenticate", { "app_id": appid, "token": data.data.token },)
        axios({
            url:"https://wanjiashe.com/" + zhibo8Environment + "/isAuthenticate",
            params:{ "app_id": appid, "token": data.data.token },
            adapter: jsonpAdapter,
        })
        .then((data: any) => {

            // })
            //         $.ajax({
            //             url: "https://wanjiashe.com/" + zhibo8Environment + "/isAuthenticate",
            //             type: "GET",
            //             data: { "app_id": appid, "token": data.data.token },
            //             dataType: "jsonp",
            //             success: function (data) {
            if (data.status == 'success') {
                if (data.data.is_auth == 0) {
                    //实名认证弹窗
                    antiWallow.init(data.data.persist_token, cb);
                } else {
                    cb();
                }
            }
            // }
        })
        // }
    });
}
//防沉迷
export let antiWallow: any = {
    init: function (persist_token, cb) {
        this.persist_token = persist_token;
        this.cb = cb;
        this.isHorizontalScreen = document.documentElement.clientWidth > document.documentElement.clientHeight ? true : false;//宽度大于高度，判断Wie横屏
        this.ratio = document.documentElement.clientHeight / 375;
        this.zoom = this.isHorizontalScreen ? (this.ratio > 1 ? 1 : this.ratio * 1) : '';
        this.agree_n = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALVJREFUeNpi3Lx5MwMQqAJxBxC7ADEfA3ngExDvAeIKIL7NAiTUgfgEEAswUAZADgoCYicgtmACEm1QQ3cAsRQQM5KJpaBmgMxqY4J6HwSSgPg5BS5+DjUDBNyYkML0OQPlAGYGDxMDjcCowaMGjxo8ajCxBn+CsiWpYJ4ElP7CBK1OQGAOkgQ5QAaI50LZu0BVUzW0OvGiUpn8AWQmyMU3QHUUEK8D4s8UGPgZagbIrBsAAQYAQTQduWEYXsQAAAAASUVORK5CYII=';
        this.agree_t = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAW5JREFUeNqslV0rBGEUgGemiRvJhY/dSS7EkrS55FbyVYQ7/8Qv2PwIcutCblz42k1INqXkI1vuuZDCbkSK5+iot2k/xs576pnZmXd63tOZs2fc9Nq3Q/TCMoxBs1NfvEIWluDO59AHeWhx4oUktACjMOxxyKh0BwJw6yRQh7gyLqV40d1k4SFm1km4h5Jn1DSu1HQ0eY6daIUO84YNcRpu4dqmeFBbTDI+siUegBy0wTYs2hD3q7QddmEePmuJt2AdGitIUypNwL5KP8IP+WWuh6BT23AulEmPSgM9y/p7ud3DGX/BJDzCFGxAg651w4Fuegiz8FapVuVKcaPDSOQzWpaUIT2G6WrSai/vEsbhSWt4BV1wEkVaqysuYELHoZTjTKWlKG1Tq93OVZ4zNokUfoRn8lrzf4VnZJG0MDcSev4dm1m9WDEW6gnpmFX9vSeDXv6epxY+TX/xDCOScUG+UbAJxRjCojrEVfgRYACP3kwiXmMVeQAAAABJRU5ErkJggg==';
        this.smrz_icon = 'data:image/png;base64,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';
        // this.container = $(this.createDOM()).appendTo(document.body);
        this.container = document.body.append(this.createDOM());// $(this.createDOM()).appendTo(document.body);
        this.timer = null;
        this.handler();
    },
    handler: function () {
        var $username = this.container.find('.user-name'),
            $idcard = this.container.find(".ID-card"),
            $authorizeBtn = this.container.find('.authorize-btn'),
            $agreeIcon = this.container.find('.agree-icon'),
            isAgree = false;
        var _this = this;
        $agreeIcon.on("click", function () {
            isAgree = !isAgree;
            this.src = isAgree ? _this.agree_t : _this.agree_n;
        });
        $authorizeBtn.on("click", function () {
            //toast提示要勾选
            if (!isAgree) {
                _this.toastTip(null, '需先同意相关用户协议和隐私政策');
            } else {
                var username = $username.val(),
                    idcard = $idcard.val();
                if (username && idcard) {
                    if (_this.req_loading) return;
                    _this.req_loading = true;
                    $authorizeBtn.text('认证中...');
                    //提交数据
                    // jsonp("https://wanjiashe.com/" + zhibo8Environment + "/authenticate", {
                    //     realname: username,
                    //     identity_card: idcard,
                    //     app_id: 29,
                    //     persist_token: _this.persist_token
                    // })
                    axios({
                            url: "https://wanjiashe.com/" + zhibo8Environment + "/authenticate",
                           params: {
                                realname: username,
                                identity_card: idcard,
                                app_id: 29,
                                persist_token: _this.persist_token},
                        adapter: jsonpAdapter,
                    })
                    .then((res: any) => {

                        // })
                        // $.ajax({
                        //     url: "https://wanjiashe.com/" + zhibo8Environment + "/authenticate",
                        //     type: 'GET',
                        //     dataType: 'jsonp',
                        //     data: {
                        //         realname: username,
                        //         identity_card: idcard,
                        //         app_id: 29,
                        //         persist_token: _this.persist_token
                        //     },
                        // success: function (res) {
                        _this.req_loading = false;
                        $authorizeBtn.text('认证');
                        if (res.status == 'success') {
                            if (!res.data.is_adulth) {
                                _this.removeDOM();
                                zhibo8Toast({
                                    zIndex: 110,  //弹窗层级
                                    width: '70%',  //弹窗默认宽度
                                    title: '\u5b9e\u540d\u8ba4\u8bc1\u901a\u77e5',  //实名认证通知
                                    content: '\u7ecf\u68c0\u6d4b\u540e\u53d1\u73b0\u60a8\u662f\u672a\u6210\u5e74\u7528\u6237\uff0c\u6839\u636e\u76f8\u5173\u6cd5\u5f8b\u89c4\u5b9a\uff0c\u5e74\u6ee118\u5468\u5c81\u7684\u7528\u6237\u624d\u53ef\u4ee5\u767b\u5f55\u6e38\u620f\u4f53\u9a8c',
                                    align: 'center',
                                    cancelBtn: false,
                                    confirmCtx: '\u6211\u77e5\u9053\u4e86',  //我知道了
                                    confirmCallback: function () {
                                        if ((window as any).webkit?.messageHandlers?.AppJavaScriptMessageHandler) {
                                            (window as any).webkit.messageHandlers.AppJavaScriptMessageHandler.postMessage({
                                                type: 3,
                                                data: { close: true }
                                            });
                                        } else if ((window as any).zhibo8Act?.finish) {
                                            (window as any).zhibo8Act.finish('');
                                        } else {
                                            return 'no-method'
                                        }
                                    }
                                });
                            } else {
                                _this.removeDOM();
                                typeof _this.cb === 'function' && _this.cb();
                            }
                        } else {
                            _this.req_loading = false;
                            $authorizeBtn.text('认证');
                            _this.toastTip(null, res.msg || '请求异常');
                        }
                        // }
                    })
                }
            }
        });
    },
    removeDOM: function () {
        // $(this.container).remove();
        this.container.remove();
    },
    exit: function (msg) {
        zhibo8Toast({
            zIndex: 110,  //弹窗层级
            width: '70%',  //弹窗默认宽度
            title: '\u6e38\u620f\u6e29\u99a8\u63d0\u793a',  //游戏温馨提示
            content: msg,
            align: 'center',
            cancelBtn: false,
            confirmCtx: '\u6211\u77e5\u9053\u4e86',  //我知道了
            confirmCallback: function () {
                if ((window as any).webkit?.messageHandlers?.AppJavaScriptMessageHandler) {
                    (window as any).webkit.messageHandlers.AppJavaScriptMessageHandler.postMessage({
                        type: 3,
                        data: { close: true }
                    });
                } else if ((window as any).zhibo8Act?.finish) {
                    (window as any).zhibo8Act.finish('');
                } else {
                    return 'no-method'
                }
            }
        });
    },
    createDOM() {
        return '<div class="body-bg">\
				<style>\
					.body-bg{position:fixed;top:0;right:0;bottom:0;z-index:97;left:0;background-color:rgba(0,0,0,.4);}\
					.real-name{position:absolute;top:50%;left:50%;z-index:98;'+ (this.isHorizontalScreen ? 'width:' + 360 / this.zoom + 'px;margin-top:8px;zoom:' + this.zoom : 'width:290px') + ';background:#fff;color:#fff;-webkit-border-radius:12px;border-radius:12px;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);}\
					.real-name a{-webkit-tap-highlight-color: transparent;text-decoration:none;}\
					.real-name input{outline:none;border:none;}\
					.real-name .top-icon{position:absolute;left:50%;margin-left:-74px;'+ (this.isHorizontalScreen ? 'width:118.4px;top:-33px;margin-left:-59.2px;' : 'width:148px;top:-45px;margin-left:-74px;') + 'height:auto;vertical-align:top;}\
					.real-name .rn-box{padding:0 0 20px;}\
					.real-name .rn-title{position:absolute;'+ (this.isHorizontalScreen ? 'top:31px' : 'top:40px') + ';left:0;width:100%;margin:0;height:24px;line-height:24px;text-align:center;font-size:17px;color:#fff;font-weight:bold;}\
					.real-name .rn-tip{padding:'+ (this.isHorizontalScreen ? '66px  15px 10px' : '84px 15px 14px') + ';font-size:15px;line-height:1.4em;margin:0;background:linear-gradient(270deg,rgba(70,104,255,1) 0%,rgba(46,159,255,1) 100%);-webkit-border-radius:12px 12px 0 0;border-radius:12px 12px 0 0;}\
					.rn-form{margin:0 20px;color:#333;}\
					.rn-form .rn-form-row{display:flex;display:-weibkit-flex;align-items:center;-webkit-align-items:center;'+ (this.isHorizontalScreen ? 'height:39px;line-height:39px' : 'height:49px;line-height:49px') + ';border-bottom:1px solid #EBEBEB;overflow:hidden;}\
					.rn-form .form-label,.rn-form .form-input{font-size:14px!important;}\
					.rn-form .form-input{display:flex;display:-weibkit-flex;align-items:center;-webkit-align-items:center;height:inherit;}\
					.rn-form .form-label{width:52px;white-space:nowrap;}\
					.rn-form input{display:inline-block;width:100%;height:20px;line-height:20px;font-size:14px;}\
					.rn-form input::placeholder{color:#B3B3B3;font-size:14px;}\
					.rn-form .authorize-btn{display:block;height:39px;line-height:39px;background:#2e9fff;color:#fff;text-align:center;font-size:15px;-webkit-border-radius:6px;border-radius:6px;}\
					.real-name .play-end-top{margin: 0;padding:6px 8px;background-color:#F5F5F5;color:#999999;font-size:12px;-webkit-border-radius:0 0 6px 6px;border-radius:0 0 6px 6px;}\
					.agree-row{display:flex;disply:-webkit-flex;align-items: center;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-align-items: center;'+ (this.isHorizontalScreen ? 'margin:6px 0' : 'margin:12px 0') + ';min-height:17px;line-height:17px;}\
					.agree-row img{margin-right:4px;width:11px;height:11px;}\
					.agree-row span{vertical-align:middle;font-size:12px;}\
					.agree-row .link{color:#2e9fff;vertical-align:middle;font-size:12px;}\
				</style>\
				<div class="real-name" id="real-name">\
				<div class="rn-box">\
					<img class="top-icon" src="'+ this.smrz_icon + '" />\
					<h2 class="rn-title">实名认证</h2>\
					<p class="rn-tip">为了您的账号安全和未成年人的防沉迷保护，请使用有效的身份信息进行实名注册。未填写身份信息未来可能无法进入游戏（所有游戏公司都一样）</p>\
					<div class="rn-form">\
						<div class="rn-form-row">\
							<div class="form-label">姓名</div>\
							<div class="form-input"><input type="text" class="user-name" placeholder="请输入真实姓名" /></div>\
						</div>\
						<div class="rn-form-row">\
							<div class="form-label">身份证</div>\
							<div class="form-input"><input type="text" class="ID-card" placeholder="请输入身份证号码" /></div>\
						</div>\
						<p class="play-end-top">用户填写的身份信息属于用户个人隐私，绝不公开或透露用户信息内容</p>\
						<div class="agree-row"><img class="agree-icon" src="'+ this.agree_n + '" /><span>我已阅读并同意</span><a target="_blank" href="https://pl.zhibo8.cc/usercenter/web/userService.html?web_target=_blank" class="link">《用户协议》</a><a target="_blank" href="https://www.zhibo8.cc/web/privacyPolicy.html" class="link">《隐私政策》</a></div>\
						<a href="javascript:;" class="authorize-btn">认证</a>\
					</div>\
				</div>\
			</div>\
			</div>\
		';
    },
    toastTip: function (node, msg) {
        node = node || this.container.find('.real-name');
        if (this.$tip) {
            this.$tip.remove()
            clearTimeout(this.timer);
        }
        var _this = this;
        this.$tip = node.append('<div style="position:absolute;bottom:100px;left:50%;z-index:98;min-width:50px;height:36px;line-height:36px;padding:0 15px;white-space:nowrap;background-color:rgba(0,0,0,.8);color:#fff;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-border-radius:3px;border-radius:3px;font-size:12px;">' + msg + '</div>');
        let $tip = this.$tip;
        // var $tip = this.$tip = $('<div style="position:absolute;bottom:100px;left:50%;z-index:98;min-width:50px;height:36px;line-height:36px;padding:0 15px;white-space:nowrap;background-color:rgba(0,0,0,.8);color:#fff;-webkit-transform:translateX(-50%);transform:translateX(-50%);-webkit-border-radius:3px;border-radius:3px;font-size:12px;">' + msg + '</div>').appendTo(node);
        this.timer = setTimeout(function () {
            _this.isToastTip = false;
            $tip.remove();
        }, 3000);

    }
}




