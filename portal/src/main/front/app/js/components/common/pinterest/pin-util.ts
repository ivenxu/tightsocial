
// const pinSDKFileName = "../../../../external/pinterest/sdk.js";

export class PinUtil{
  static loadSDK() : void{
      // (function(d, s, id){
      //       var js, pjs = d.getElementsByTagName(s)[0];
      //       if (d.getElementById(id)) {return;}
      //       js = d.createElement(s); js.id = id;
      //       js.src = pinSDKFileName;
      //       pjs.parentNode.insertBefore(js, pjs);
      //   }(document, 'script', 'pinterest-jssdk'));
    }

  static configSDK(appId: string) : void{
      window.pAsyncInit = function() {
        PDK.init({
            appId: appId, // Change this
            cookie: true
        });
    };
    window.pAsyncInit();
  }
}
