
import '../assets/style/popup.scss';

export class Popup {
  // public screenWidth: number;
  // public screenHeight: number;
  public container: any;
  public options: any;

  public timeout: any;

  constructor(opt: any) {
    // this.screenWidth = document.documentElement.clientWidth;
    // this.screenHeight = document.documentElement.clientHeight;
    this.container = document.createElement('div');

    let defultOptions = {
      className: 'popup-container',
      // zIndex: 3000, // 弹框层级
      width: '75%', // 弹框宽度
      title: '', // 弹框 title
      content: '',
      cancelBtn: false,  // 取消按钮
      cancelCtx: '取消', // 取消按钮
      confirmBtn: true, // 确认按钮
      confirmBtnColor: '#007aff',// 确认按钮
      confirmCtx: '确认',// 确认按钮
      timeout: 0, // 自动关闭时长，为0时不自动关闭
      shadowClick: false, // 点击遮罩关闭
      closeBtn: false,
      cancelCallback: () => { }, // 取消回调
      confirmCallback: () => { } // 确认回调
    }

    this.options = Object.assign({}, defultOptions, opt);
    this.timeout = 0;

  }

  // 创建Dom
  createDom(content: any = '') {
    let options = this.options;
    let dom = `<div class="lh-shadow"></div>
    <div class="lh-container lh-popup-box ${options.className}" style="width:${options.width};">
      ${options.title || options.closeBtn ?
        `<div class="lh-header">${options.title}<a class="lh-close-btn" herf="javascript:;">&times;</a></div>`
        : ''}
      ${content}
      ${options.cancelBtn || options.confirmBtn ?
        `<div class="lh-popup-bottom">
          ${options.cancelBtn ? `<button class="lh-button cancelBtn">${options.cancelCtx}</button>` : ''}
          ${options.confirmBtn ? `<button class="lh-button primary confirmBtn">${options.confirmCtx}</button>` : ''}
        </div>`
        : ''
      }
    </div>`
    this.container = document.createElement('div');
    this.container.className = 'lh-popup';

    this.container.innerHTML = dom;
    document.body.appendChild(this.container);
    this.initEvent();
    if (options.timeout) {
      this.timeout = setTimeout(() => {
        this.removeDom();
      }, options.timeout)
    }
  }

  // 移除Dom
  removeDom() {
    clearTimeout(this.timeout);
    this.removeEvent();
    this.container && document.body.removeChild(this.container);
    this.container = null;
  }

  // 取消操作
  cancelEvent() {
    this.options?.cancelCallback();
    this.removeDom();
  }

  // 确认事件
  confirmEvent() {
    this.options?.confirmCallback();
    this.removeDom();
  }

  shadowEvent() {
    this.removeDom();
  }

  // 定义事件
  initEvent() {
    // 取消按钮
    let cancelBtn = this.container.querySelector('.cancelBtn');
    cancelBtn && cancelBtn.addEventListener('click', () => { this.cancelEvent() });

    // 确认按钮
    let confirmBtn = this.container.querySelector('.confirmBtn');
    confirmBtn && confirmBtn.addEventListener('click', () => { this.confirmEvent() });

    // shadow按钮
    const shadowBox = this.container.querySelector('.lh-shadow');
    this.options?.shadowClick && shadowBox && shadowBox.addEventListener('click', () => { this.shadowEvent() })

  }
  // 移除事件
  removeEvent() {
    let cancelBtn = this.container.querySelector('.cancelBtn');
    cancelBtn && cancelBtn.removeEventListener('click', () => { this.cancelEvent() });

    let confirmBtn = this.container.querySelector('.confirmBtn');
    confirmBtn && confirmBtn.removeEventListener('click', () => { this.confirmEvent(); });

    // shadow按钮
    const shadowBox = this.container.querySelector('.lh-shadow');
    shadowBox && shadowBox.removeEventListener('click', () => { this.shadowEvent() })
  }
}


export class Toast {
  public configOptions: any;
  // public timeOut: number;
  constructor(opt = {}) {
    let defaultOptions = {
      type: '',
      width: '50%', // 弹框宽度
      title: '', // 弹框 title
      timeout: 5 * 1000, // 自动关闭
    }
    // super(Object.assign({}, defaultOptions, opt));
    this.configOptions = Object.assign({}, defaultOptions, opt)
  }

  alert(msg) {
    new Popup(Object.assign({},
      this.configOptions,
      {
        className: 'alert-container',
        timeout: 0
      })).createDom(msg);
  }

  success(msg) {
    new Popup(Object.assign({},
      this.configOptions,
      {
        className: 'success-container',
        confirmBtn: false
      })).createDom(msg);
  }

  error(msg) {
    new Popup(Object.assign({},
      this.configOptions,
      {
        className: 'error-container',
        confirmBtn: false
      })).createDom(msg);
  }
}


export default { Popup, Toast };