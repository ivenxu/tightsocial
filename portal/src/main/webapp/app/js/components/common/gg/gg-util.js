System.register([], function(exports_1) {
    var GGUtil;
    return {
        setters:[],
        execute: function() {
            GGUtil = (function () {
                function GGUtil() {
                }
                GGUtil.configSDK = function (apiKey, clientId) {
                    window.ggAsyncInit = function (apiKey) {
                        gapi.client.setApiKey(apiKey);
                    };
                    window.ggAsyncInit.apiKey = apiKey;
                    window.ggAsyncInit.clientId = clientId;
                };
                GGUtil.setApiKey = function () {
                    window.ggAsyncInit(window.ggAsyncInit.apiKey);
                };
                return GGUtil;
            })();
            exports_1("GGUtil", GGUtil);
        }
    }
});
//# sourceMappingURL=gg-util.js.map