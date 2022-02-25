import { setCookie, getCookie } from './utils/tools';

import { facility, browser } from './browser';

function app() {
  setCookie('user', 'user-cookie');

  console.log(facility(), browser(), browser().mobile, getCookie('user'));
}

app();
