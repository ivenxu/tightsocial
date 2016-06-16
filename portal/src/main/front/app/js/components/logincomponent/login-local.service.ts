import { Injectable, NgZone } from 'angular2/core';
import { SocialAppInfoService } from './social-appinfo.service';
import { FBUtil } from '../common/fb/fb-util';
import { GGUtil } from '../common/gg/gg-util';
import { PinUtil } from '../common/pin/pin-util';

export const LOGIN_TOKEN_KEY = "LOGIN_TOKEN_KEY";
const GAPI_URL = "https://apis.google.com/js/client.js";
const GAPI_SCOPES = 'https://www.googleapis.com/auth/userinfo.profile';


(function(d: Document, s: string, id: string, cb: string) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = GAPI_URL + "?onload=" + cb;
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'gapi_auth', 'handleGGClientLoad');

function handleGGClientLoad(){
  GGUtil.setApiKey();
  if (!window.angularComponentRef){
    setTimeout(handleGGClientLoad, 10);
  } else {
    window.angularComponentRef.zone.run(() => {window.angularComponentRef.component.handleGGClientLoad();})
  }
}

@Injectable()
export class LoginLocalService{
  private appInfo: any;
  constructor(private soicalAppInfoService: SocialAppInfoService, ngZone: NgZone){
    window.angularComponentRef = {
      zone: ngZone,
      handleGGClientLoad: () => this.handleGGClientLoad(),
      component: this
    };
    this.getSocialAppInfo();

  }

  isLoggedIn(): boolean{
    let storedToken = sessionStorage.getItem(LOGIN_TOKEN_KEY);
    if (storedToken){
      return true;
    } else {
      let pinSession = PDK.getSession();
      if (pinSession){
        this.fetchPinSession(pinSession);
        return true;
      }
      let fbSession = FB.getAuthResponse();
      if (fbSession){
        console.log(fbSession);
      }

      return false;
    }

  }

  logout(){
    console.log("log demm out!");
    let storedTokenStr = sessionStorage.getItem(LOGIN_TOKEN_KEY);
    if (storedTokenStr){
    let storedToken = LoginToken.fromJson(storedTokenStr);
      switch(storedToken.loginType){
        case LoginType.GG:
          this.ggLogout();
        case LoginType.PN:
          PDK.logout();
        default:
          console.log("not implmented yet!")
      }

    }
  }

  getLoginToken(): Promise<LoginToken>{
    return new Promise<LoginToken>((resolve, reject)=>{
      console.log("getLoginToken");
      let storedToken = sessionStorage.getItem(LOGIN_TOKEN_KEY);
      if (storedToken){
        console.log("has loged in");
        resolve(LoginToken.fromJson(sessionStorage.getItem(LOGIN_TOKEN_KEY)));
      } else {
        console.log("try get status");
        this.getSocialAppInfo().then(appInfo=>{
          let pinSession = PDK.getSession();
          if (pinSession){
            this.fetchPinUserInfo(pinSession).then(token=>{
              resolve(token);
            });
          }
          this.fetchFBAuthStatus().then(token=>{
            resolve(token);
          });
        });
      }
    });
  }

  handleGGClientLoad(): void{
    this.checkGGAuth();
  }

  handleGGAuthClick() {
    gapi.auth.authorize({client_id: window.ggAsyncInit.clientId, scope: GAPI_SCOPES, cookie_policy: 'single_host_origin', immediate: false}, this.handleGGAuthResult);
  }

  private ggLogout(){
    // need to revoke token to sigout google
    // http://stackoverflow.com/questions/22086301/gapi-auth-signout-not-working-im-lost
    let revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token;

    $.ajax({    type: 'GET',
                url: revokeUrl,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                success: function (nullResponse) { },
                error: function (e) {}
            });
    gapi.auth.setToken(null);
    gapi.auth.signOut();
  }

  private getSocialAppInfo(): Promise<any>{
    if (this.appInfo){
      return new Promise<any>(resolve=>resolve(this.appInfo));
    } else {
      let promise = this.soicalAppInfoService.getSocialAppInfo();
      promise.then(appInfo => {
        this.appInfo = appInfo;
        FBUtil.configSDK(appInfo.fbAppId);
        GGUtil.configSDK(appInfo.ggApiKey, appInfo.ggClientId);
        PinUtil.configSDK(appInfo.pinAppId);
      });
      return promise;
    }
  }

  private checkGGAuth() {
    gapi.auth.authorize({client_id: window.ggAsyncInit.clientId, scope: GAPI_SCOPES, cookie_policy: 'single_host_origin', immediate: true}, this.handleGGAuthResult);
  }

  private handleGGAuthResult(authResult: any){
    if (authResult && !authResult.error) {
      console.log(authResult);
      gapi.client.load('plus', 'v1', function() {
        var request = gapi.client.plus.people.get({
          'userId': 'me'
        });
        request.execute(function(resp) {
          console.log(resp);
        });
      });
      // this.fetchGGAuthInfo();
    } else {
      console.log("error.....")
    }
  }

  private fetchPinUserInfo(pinSession: any): Promise<LoginToken>{
    return new Promise<LoginToken>((resolve, reject)=>{
      PDK.me(function(response){
        if (response && response.data){
          let uid = response.data.id;
          let pinToken = new LoginToken(LoginType.PN, <string>uid, <string>pinSession.accessToken, <string>pinSession.scope);
          sessionStorage.setItem(LOGIN_TOKEN_KEY, pinToken.toString());
          resolve(LoginToken.fromJson(sessionStorage.getItem(LOGIN_TOKEN_KEY)));
        } else {
          reject("PDK.me error!");
        }
      });
    });
  }

  static fetchFBUserInfo(authResponse: any): Promise<LoginToken>{
    console.log("fetchFBUserInfo");
    return new Promise<LoginToken>((resolve, reject)=>{
      FB.api('/me', function(response) {
        console.log(response);
        if (response){
          let fbToken = new LoginToken(LoginType.FB, "uid", "yyy", "xx.xx");
          sessionStorage.setItem(LOGIN_TOKEN_KEY, fbToken.toString());
          resolve(LoginToken.fromJson(sessionStorage.getItem(LOGIN_TOKEN_KEY)));
        } else {
          reject("FB.api(/me) error!");
        }
      });
    });
  }

  private fetchFBAuthStatus(): Promise<LoginToken>{
    console.log("fetchFBAuthStatus");
    return new Promise<LoginToken>((resolve, reject)=>{
      console.log("before FB.getLoginStatus!");
      FB.getLoginStatus(function(response) {
        console.log(response);
        if(response){
          LoginLocalService.fetchFBUserInfo(response).then(token=>{
            resolve(token);
          });
        } else {
          console.log("FB.getLoginStatus error!");
          reject("FB.getLoginStatus error!");
        }
      });
    });
  }

  private fetchPinSession(pinSession: any): void{
    PDK.me(function(response){
      let uid = response.data.id;
      let pinToken = new LoginToken(LoginType.PN, <string>uid, <string>pinSession.accessToken, <string>pinSession.scope);
      sessionStorage.setItem(LOGIN_TOKEN_KEY, pinToken.toString());
    });
    console.log(sessionStorage.getItem(LOGIN_TOKEN_KEY));
  }
}


export class LoginToken{
  constructor(public loginType: LoginType, public uid: string, public token: string, public scope: string){

  }

  static fromJson(json: string) {
        var data = JSON.parse(json);
        return new LoginToken(data.loginType, data.uid, data.token, data.scope);
    }

  public toString(): string{
    return JSON.stringify(this);
  }
}

export enum LoginType{
  LC = <any>"LC",
  FB = <any>"FB",
  PN = <any>"PN",
  TW = <any>"TW",
  GG = <any>"GG"
}
