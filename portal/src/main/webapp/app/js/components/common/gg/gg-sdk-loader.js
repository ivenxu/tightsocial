System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var GAPI_URL, GGSDKLoader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            GAPI_URL = "https://apis.google.com/js/client.js";
            GGSDKLoader = (function () {
                function GGSDKLoader() {
                    // GGUtil.configSDK();
                }
                GGSDKLoader = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GGSDKLoader);
                return GGSDKLoader;
            })();
            exports_1("GGSDKLoader", GGSDKLoader);
            (function (d, s, id, cb) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                js.src = GAPI_URL + "?onload=" + cb;
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'gapi_auth', '');
        }
    }
});
//# sourceMappingURL=gg-sdk-loader.js.map