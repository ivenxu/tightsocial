import { Injectable } from 'angular2/core';
@Injectable()
export class SocialAppInfoService{
  getSocialAppInfo(){
    return new Promise<any>(resolve=>setTimeout(()=>resolve({
      fbAppId: '180821955606635',
      pinAppId: '4813367890449279496',
      ggApiKey: 'AIzaSyBW2cBGkzi0rsGtjFsBI_lDPzAsfLD9LWU',
      ggClientId: '547875598366-g1u6taco4f9cqr5r6a3spcss5ja32rue.apps.googleusercontent.com'
    }), 2000));
  }
}

// export interface AppInfo{
//
// }
