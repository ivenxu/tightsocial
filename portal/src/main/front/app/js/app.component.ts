import {Component, OnInit} from 'angular2/core';
import { LoginDialogComponent } from './components/logincomponent/login-dialog.component';
import { LoginToken, LoginLocalService } from './components/logincomponent/login-local.service';
import { SocialAppInfoService } from './components/logincomponent/social-appinfo.service';

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
    <a (click)="onLogin()" [hidden]='isLoggedIn'>login</a>
    <a (click)="onLogout()" [hidden]='!isLoggedIn'>logout</a>
    <login-dialog dialogId="loginDlg"></login-dialog>`,
    directives: [LoginDialogComponent],
    providers: [LoginLocalService, SocialAppInfoService]
})
export class AppComponent implements OnInit {
  private loginToken: LoginToken;
  isLoggedIn: boolean = false;
  constructor(private loginLocalService: LoginLocalService){

  }

  ngOnInit() {
    this.loginLocalService.getLoginToken()
    .then(token=>{
      this.loginToken=token;
      this.isLoggedIn = true;
      console.log("loged in!");
    })
    .catch(error=>{
      console.log("blabalba error!");
      console.log(error);
      this.isLoggedIn = false;
    });
  }

  onLogin(){
    $('#loginDlg').modal();
  }
  onLogout(){
    this.loginLocalService.logout();
  }
}
