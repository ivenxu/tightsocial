// const pinSDKFileName = "../../../../external/pinterest/sdk.js";
System.register([], function(exports_1) {
    var PinUtil;
    return {
        setters:[],
        execute: function() {
            PinUtil = (function () {
                function PinUtil() {
                }
                PinUtil.loadSDK = function () {
                    // (function(d, s, id){
                    //       var js, pjs = d.getElementsByTagName(s)[0];
                    //       if (d.getElementById(id)) {return;}
                    //       js = d.createElement(s); js.id = id;
                    //       js.src = pinSDKFileName;
                    //       pjs.parentNode.insertBefore(js, pjs);
                    //   }(document, 'script', 'pinterest-jssdk'));
                };
                PinUtil.configSDK = function (appId) {
                    window.pAsyncInit = function () {
                        PDK.init({
                            appId: appId,
                            cookie: true
                        });
                    };
                    window.pAsyncInit();
                };
                return PinUtil;
            })();
            exports_1("PinUtil", PinUtil);
        }
    }
});
//# sourceMappingURL=pin-util.js.map