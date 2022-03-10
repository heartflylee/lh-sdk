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


/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func: Function, wait?: number, immediate?: boolean) {
  let timeout: any;

  return function (...params: any) {
    let args = params;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(this, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(this, args);
      }, wait);
    }
  };
}
/**
 * @desc 函数节流
 * @param func throttle
 * @param delay 延迟执行毫秒数，默认 1000ms
 */
export const throttle = function (func: Function, delay?: number) {
  let timer: any = null;
  return function () {
    /* eslint-disable-next-line */
    let context = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
};
// 对函数进行 节流
export const throttleOther = function (fn: Function, delay = 5000, clearFn: Function) {
  let timer: any = null;
  let patrolTimer: any = null; //巡查timer
  let firstTime = true;

  return function () {
    let args = arguments;
    if (firstTime) {
      // 第一次加载
      fn.apply(this, args);
      firstTime = false;
      return;
    }
    if (timer) {
      // 定时器正在执行中，跳过
      return;
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(this, args);
    }, delay);
    // delay + 1s之后巡查是否还有定时任务待执行，如果没有 下次又是新的一轮
    patrolTimer = setTimeout(() => {
      clearTimeout(patrolTimer);
      if (!timer) {
        firstTime = true;
        let tempTimer = setTimeout(() => {
          clearTimeout(tempTimer);
          clearFn.apply(this, args);
        }, delay - 1100);
      }
    }, delay + 100);
  };
};

// 获取地址栏参数
export const getParamsByName = (name, url) => {
  url = url ? url : self.window.document.location.href;
  var start = url.indexOf(name + '=');
  if (start == -1) return '';
  var len = start + name.length + 1;
  var end = url.indexOf('&', len);
  if (end == -1) end = url.length;
  return url.substring(len, end);
}
/**
 * 获取地址栏参数
 * @param variable
 * @returns
 */
export function getQueryVariable(variable: string) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
}


// 根据prop获取object上的属性，支持 obj.name.test
export const getValueByPath = function(object: Record<string, any>, prop: string) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) current = {};

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};