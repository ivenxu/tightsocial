import { Input, Component } from 'angular2/core';
import { LoginComponent } from './login.component';

@Component({
  selector: 'login-dialog',
  template: `<div [id]="dialogId" [attr.data-show]="show" [attr.data-backdrop]="backdrop" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog login-container-xs login-container-sm login-container-md login-container-lg" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <login></login>
          </div>
        </div>
    </div>
  </div>`,
  directives: [LoginComponent]
})

export class LoginDialogComponent{
  @Input() dialogId: string;
  @Input() show: boolean;
  @Input() backdrop: string;
  constructor(){
    this.show = true;
    this.backdrop = "true";
  }
}
