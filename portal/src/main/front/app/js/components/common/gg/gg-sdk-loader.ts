import { Injectable } from 'angular2/core';
import { GGUtil } from './gg-util';
const GAPI_URL = "https://apis.google.com/js/client.js";

@Injectable()
export class GGSDKLoader{
  constructor(){
    // GGUtil.configSDK();
  }
}

(function(d: Document, s: string, id: string, cb: string) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = GAPI_URL + "?onload=" + cb;
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'gapi_auth', '');
