/**
 * http请求/相应拦截器
 */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getChannel, getSessionTimeOut, getToken } from './storage';
import { Toast } from '../popup';
// import { SysStore } from '@/store/modules/public/system-store';
// import { TagsViewStore } from '@/store/modules/public/tags-view';

import { debounce } from './tools';
// import { EventBus } from '@/utils/event-bus';

/**
 * 根据运行环境确定url地址
 * @param env
 */
const getBaseUrl = () => {
  return '/'
};
const pending: any[] = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const removePending = (ever: any) => {
  for (let p in pending) {
    // url method 参数都不一致才取消请求
    if (
      pending[p].u === ever.url + '&' + ever.method &&
      JSON.stringify(pending[p].data) === JSON.stringify(ever.data) &&
      JSON.stringify(pending[p].params) === JSON.stringify(ever.params)
    ) {
      //当当前请求在数组中存在时执行函数体
      pending[p].f(); //执行取消操作
      pending.splice(p as any, 1); //把这条记录从数组中移除
    }
  }
};


const toast = new Toast();

/**
 * 创建文件下载的DOM结构
 * @param response
 */
//  function downloadUrl(response: AxiosResponse) {
//    // application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
//    let blob = new Blob([response.data], { type: 'application/actet-stream;charset=utf-8' });
//    // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
//    let contentDisposition = response.headers['content-disposition'];
//    let patt = /filename=([^;]+\.[^\.;]+);*/;
//    // let pattReg = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
//    let filename = (patt.exec(contentDisposition) as any)[1].replace(/\"/g, '');
//    let downloadElement = document.createElement('a');
//    let href = window.URL.createObjectURL(blob); // 创建下载的链接
//    downloadElement.style.display = 'none';
//    downloadElement.href = href;
//    downloadElement.download = decodeURIComponent(filename); // 下载后文件名
//    document.body.appendChild(downloadElement);
//    downloadElement.click(); // 点击下载
//    document.body.removeChild(downloadElement); // 下载完成移除元素
//    return downloadElement.download;
//  }
const messageError = (message: string) => {
  // new Toast({ type: 'error', message }) 
  toast.error(message || '')

  //  Vue.prototype.$toast.error(message);
};
// 防止多次Message错误信息
const debounceMessageError = debounce(messageError, 500);
// const debounceLoginOut = debounce(() => {
//   EventBus.$emit('login.login-out');
// }, 500);
let CancelToken = axios.CancelToken;
/**
 * HTTP拦截器
 */
class UAxios {
  public baseURL: string;
  public timeOut: string;
  public withCredentials: boolean;
  public crossDomain: boolean;

  public constructor() {
    this.baseURL = getBaseUrl();
    this.timeOut = getSessionTimeOut();
    this.withCredentials = false; // 不携带凭证
    this.crossDomain = true; // 允许跨域
  }

  public request(options: AxiosRequestConfig, cancelToken = true) {
    // 每次请求都会创建新的axios实例。
    const instance: AxiosInstance = axios.create({
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8'
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }
    });
    // 将用户传过来的参数与公共配置合并
    const config = {
      baseURL: this.baseURL, //添加了分析中心请求ip地址
      timeOut: this.timeOut,
      withCredentials: this.withCredentials,
      crossDomain: this.crossDomain,
      ...options
    };
    // 配置拦截器，支持根据不同url配置不同的拦截器。
    this.setInterceptors(instance, cancelToken); // options.url
    // 返回axios实例的执行结果
    return instance(config);
  }

  private setInterceptors(instance: AxiosInstance, cancelToken: boolean) {
    // 请求拦截器
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // config.headers.contentType = 'application/json; charset=utf-8';
        if (config.method === 'get' || config.method === 'delete') {
          config.data = true;
        }
        // config.headers['Content-Type'] = 'application/json; charset=utf-8';
        // 每个请求都传递token
        let token = getToken();
        if (token) {
          (config.headers as any)['P-Token'] = token;
        }
        let channel = getChannel();
        if (channel) {
          (config.headers as any)['P-ID'] = channel;
        }
        config.responseType = config.responseType ? config.responseType : undefined;
        if (cancelToken) {
          removePending(config); //在一个ajax发送前执行一下取消操作
          config.cancelToken = new CancelToken((c) => {
            // url,port,params一致，则取消重复请求
            pending.push({
              u: config.url + '&' + config.method,
              f: c,
              data: config.data,
              params: config.params
            });
            return;
          });
        }
        return config;
      },
      (err: AxiosError) => {
        //  Vue.prototype.$toast.error(err);
        //  new Toast({type:'error', message: err.message})
        toast.error(err.message || '')
        Promise.reject(err);
      }
    );

    // 响应拦截器
    instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        // 拦截文件下载数据
        //  if (response.headers && response.headers['content-type'] === 'application/octet-stream;charset=utf-8') {
        //    return downloadUrl(response);
        //  } else {
        cancelToken && removePending(response.config); //请求结束后，移除本次请求
        const { code = '', msg } = response.data;
        // 下载异常处理
        if (response.data.type && response.data.type === 'application/json') {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            if (e.target.readyState === 2) {
              let res: any = {};
              res = JSON.parse(e.target.result);
              debounceMessageError(res.msg);
            }
          };
          reader.readAsText(response.data);
        }

        if (code === 20 || code === 0) {
          return response.data;
        } else if (code === -4) {
          //  router.replace({
          //    path: 'login'
          //  });
          return Promise.reject(response.data);
        } else {
          debounceMessageError(msg);
          return Promise.reject(response.data);
        }
        //  }
      },
      (err) => {
        if (axios.isCancel(err)) {
          return Promise.reject('重复的API请求');
        } else {
          if (err.response) {
            switch (err.response.status) {
              case 401:
              // 返回 401 清除token ? 或者 跳转到401页面 或者 跳转到登录页面
              // router.replace({
              //   path: '/401'
              // });

              //  debounceMessageError('您没有访问当前接口的权限，请联系相关人员开通该权限');
              case 404:
                // 返回404 跳转到404页面 或者 跳转到登录页面
                //  Vue.prototype.$toast.error('接口不存在');
                //  new Toast({type:'error', message:'接口不存在'})
                toast.error('接口不存在');
              // router.replace({
              //   path: '/404'
              // });
            }
          }
          return Promise.reject(err); // 返回接口返回的错误信息
        }
      }
    );
  }
}

let HttpServ = new UAxios();

export default HttpServ;
