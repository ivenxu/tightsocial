import { Component } from 'angular2/core';
import { PinSDKLoader } from '../common/pinterest/pin-sdk-loader';
import { FBSDKLoader } from '../common/fb/fb-sdk-loader';
import { GGUtil } from '../common/gg/gg-util';
import { LoginLocalService } from './login-local.service';


@Component({
  selector: 'login',
  templateUrl: 'html/components/logincomponent/login.component.html',
  providers: [FBSDKLoader, PinSDKLoader]
})
export class LoginComponent{
  constructor(fbSDKLoader: FBSDKLoader, pinSDKLoader: PinSDKLoader, private loginLocalService: LoginLocalService){

    // loginLocalService.isLoggedIn();
  }

  onPinLogin(){
    PDK.login({scope: 'read_public,write_public,read_relationships,write_relationships'}, (response) => {
      this.pinLoginCallback(response);
    });
  }

  onFBLogin(){
    FB.login((response) => {
      this.fbLoginCallback(response);
    }, {scope: 'email,user_likes', return_scopes: true});
  }

  onGGLogin(){
    this.loginLocalService.handleGGAuthClick();
  }

  private pinLoginCallback(response: any){
    console.log('pin login callback.');
    if (response.status == 'connected'){
      console.log('Fetching your information....');
      PDK.me(function(response){
        console.log('Successful login for: ' + response.first_name);
      });
    }
  }

  private fbLoginCallback(response: any){
    console.log('fb login callback');
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
  }

  private ggLoginCallback(response: GoogleApiOAuth2TokenObject){
     if (response && !response.error) {
       gapi.client.load('plus', 'v1', function() {
          var request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          request.execute(function(resp) {
            console.log(resp);
          });
        });

     } else {
       console.log("User cancelled login or did not fully authorize.")
     }
  }

}
