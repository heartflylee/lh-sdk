// 设置cookie
export function setCookie(name: string, value: string, days = 30) {
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${escape(value)};expires=${exp.toUTCString()}`;
}

// 获取cookie
export function getCookie(name: string) {
  let arr: string[] | null = null;
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

// 合并
export function add(a: number, b: number) {
  return new Promise((resolve) => {
    resolve(a + b);
  });
}


// export function createElement(tag, attributes, ...children) {
//   let element;

//   //创建元素，区分普通元素和自定义元素
//   //如果为自定义元素Tag将为对应的类
//   if (typeof tag === 'string') {
//     element = new RegularNode(tag);
//   } else {
//     element = new tag();
//   }

//   //元素属性处理
//   if (attributes) {
//     for (let key in attributes) {
//       element.setAttribute(key, attributes[key]);
//     }
//   }

//   //对子元素处理
//   if (children) {
//     for (let child of children) {
//       //如果子元素为文本，则创建文本节点；
//       if (typeof child === 'string') {
//         child = new TextNode(child);
//       }
//       element.appendChild(child);
//     }
//   }
//   //返回的是最后的Dom树
//   console.log(element);
//   return element;
// } 


// /** 创建常规元素 */
// class RegularNode {
//   public node: any;
//   //初始化创建元素
//   constructor(tag) {
//     this.node = document.createElement(tag);
//   }

//   //设置元素的属性
//   setAttribute(name, attribute) {
//     this.node.setAttribute(name, attribute);
//   }

//   //挂载子元素
//   appendChild(child) {
//     child.mountTo(this.node);
//   }

//   //将元素挂载到指定元素
//   mountTo(parent) {
//     parent.appendChild(this.node);
//   }
// }

// /** 创建文本元素 */
// class TextNode {
//   public node: any;
//   constructor(text) {
//     this.node = document.createTextNode(text);
//   }

//   setAttribute(name, attribute) {
//     this.node.setAttribute(name, attribute);
//   }

//   appendChild(child) {
//     child.mountTo(this.node);
//   }
//   mountTo(parent) {
//     parent.appendChild(this.node);
//   }
// }