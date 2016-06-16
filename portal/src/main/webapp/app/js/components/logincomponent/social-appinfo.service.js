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
    var SocialAppInfoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SocialAppInfoService = (function () {
                function SocialAppInfoService() {
                }
                SocialAppInfoService.prototype.getSocialAppInfo = function () {
                    return new Promise(function (resolve) { return setTimeout(function () { return resolve({
                        fbAppId: '180821955606635',
                        pinAppId: '4813367890449279496',
                        ggApiKey: 'AIzaSyBW2cBGkzi0rsGtjFsBI_lDPzAsfLD9LWU',
                        ggClientId: '547875598366-g1u6taco4f9cqr5r6a3spcss5ja32rue.apps.googleusercontent.com'
                    }); }, 2000); });
                };
                SocialAppInfoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], SocialAppInfoService);
                return SocialAppInfoService;
            })();
            exports_1("SocialAppInfoService", SocialAppInfoService);
        }
    }
});
// export interface AppInfo{
//
// }
//# sourceMappingURL=social-appinfo.service.js.map