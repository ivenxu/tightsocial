import {Component, AfterViewInit} from 'angular2/core';
import { LoginDialogComponent } from './components/logincomponent/login-dialog.component';
@Component({
    selector: 'login-app',
    template: `<login-dialog dialogId="loginDlg" backdrop="static"></login-dialog>`,
    directives: [LoginDialogComponent]
})
export class LoginAppComponent implements AfterViewInit {
  ngAfterViewInit() {
    $("#loginDlg").modal();
  }
}
