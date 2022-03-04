import { setCookie, getCookie } from './utils/tools';

import { facility, browser } from './browser';
import Popup from './popup/index';

function app() {
  setCookie('user', 'user-cookie');

  console.log(facility(), browser(), browser().mobile, getCookie('user'));
}

app();


let popup = new Popup({
  cancelCallback: (a: any) => {
    console.log(a);
  }
});

