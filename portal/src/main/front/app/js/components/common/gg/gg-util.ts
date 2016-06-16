
export class GGUtil{

  static configSDK(apiKey: string, clientId: string) : void{
    window.ggAsyncInit = function(apiKey: any) {

      gapi.client.setApiKey(apiKey);
    }
    window.ggAsyncInit.apiKey = apiKey;
    window.ggAsyncInit.clientId = clientId;
  }

  static setApiKey(){
    window.ggAsyncInit(window.ggAsyncInit.apiKey);
  }
}
