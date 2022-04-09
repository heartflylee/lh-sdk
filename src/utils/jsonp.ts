export const jsonp = (url,data) => {

    return new Promise((resolve, reject) => {
        // 这里的 "jsonCallBack" ，和调用的 jsonp 的 url 中的 callback 值相对应（见粗体字）
        (window as any).jsonCallBack = (result) => {
            resolve(result)
        }
        const JSONP = document.createElement('script');

        let arr:string[] = [];
        Object.keys(data).forEach((key) => {
            arr.push(`${key}=${data[key]}`);
        });
        arr.push('callback=jsonCallBack');

        JSONP.type = 'text/javascript';
        JSONP.src = url + (url.indexOf('?') >0 ? '': '?') + arr.join('&');
        document.getElementsByTagName('head')[0].appendChild(JSONP);
        setTimeout(() => {
            document.getElementsByTagName('head')[0].removeChild(JSONP)
        }, 500)

    })

}

