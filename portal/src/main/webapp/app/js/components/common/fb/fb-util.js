System.register([], function(exports_1) {
    var FBUtil;
    return {
        setters:[],
        execute: function() {
            FBUtil = (function () {
                function FBUtil() {
                }
                FBUtil.configSDK = function (appId) {
                    window.fbAsyncInit = function () {
                        FB.init({
                            appId: appId,
                            cookie: true,
                            // the session
                            xfbml: true,
                            version: 'v2.5' // use graph api version 2.5
                        });
                    };
                    window.fbAsyncInit();
                };
                return FBUtil;
            })();
            exports_1("FBUtil", FBUtil);
        }
    }
});
//# sourceMappingURL=fb-util.js.map