export class FBUtil{


  static configSDK(appId: string) : void{
    window.fbAsyncInit = function() {
      FB.init({
        appId      : appId,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
      });
    }
    window.fbAsyncInit();
  }
}
