// 清空sessionStorage
export const removeSessionAll = () => window.sessionStorage.clear();


// 设置token信息
export const setToken = (token: string) => window.localStorage.setItem('token', token);
export const getToken = () => window.localStorage.getItem('token') || '';
export const removeToken = () => window.localStorage.removeItem('token');

// 获取过期时间
const timeout = 'timeout';
export const getSessionTimeOut = () => window.sessionStorage.getItem(timeout) || '0';
export const setSessionTimeOut = (content: string) => window.sessionStorage.setItem(timeout, content);


// 获取渠道信息
export const getChannel = () => window.sessionStorage.getItem('channel') || '';
export const setChannel = (content: string) => window.sessionStorage.setItem('channel', content);
