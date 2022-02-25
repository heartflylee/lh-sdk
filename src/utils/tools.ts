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
