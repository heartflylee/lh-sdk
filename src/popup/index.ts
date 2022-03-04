
import './style.scss';

class Popup {
  public screenWidth: number;
  public screenHeight: number;
  public container: any;
  public options: any;

  constructor(opt: any) {
    this.screenWidth = document.documentElement.clientWidth;
    this.screenHeight = document.documentElement.clientHeight;
    this.container = document.createElement('div');

    let defultOptions = {
      zIndex: 1000, // 弹框层级
      width: '75%', // 弹框宽度
      title: '提示', // 弹框 title
      content: '',
      cancelBtn: false,  // 取消按钮
      cancelCtx: '取消', // 取消按钮
      confirmBtn: true, // 确认按钮
      confirmBtnColor: '#007aff',// 确认按钮
      confirmCtx: '确认',// 确认按钮
      timeout: 0, // 自动关闭时长，为0时不自动关闭
      shadowClick: false, // 点击遮罩关闭
      cancelCallback: () => { }, // 取消回调
      confirmCallback: () => { } // 确认回调
    }

    this.options = Object.assign({}, defultOptions, opt)
    
       
    
    // this.createDom();
  }


  createDom(content:any = '') {
    let dom = `<div class="lh-shadow" ></div>
    <div class="lh-container lh-popup-box">
    ${content}
    </div>`
    this.container = document.createElement('div');
    this.container.className = 'lh-popup';

    this.container.innerHTML = dom;
    document.body.appendChild(this.container);
  }

  removeDom() {
    document.body.removeChild(this.container);
    
  }

}


export default Popup;