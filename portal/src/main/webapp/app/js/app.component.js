System.register(['angular2/core', './components/logincomponent/login-dialog.component', './components/logincomponent/login-local.service', './components/logincomponent/social-appinfo.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, login_dialog_component_1, login_local_service_1, social_appinfo_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_dialog_component_1_1) {
                login_dialog_component_1 = login_dialog_component_1_1;
            },
            function (login_local_service_1_1) {
                login_local_service_1 = login_local_service_1_1;
            },
            function (social_appinfo_service_1_1) {
                social_appinfo_service_1 = social_appinfo_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(loginLocalService) {
                    this.loginLocalService = loginLocalService;
                    this.isLoggedIn = false;
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.loginLocalService.getLoginToken()
                        .then(function (token) {
                        _this.loginToken = token;
                        _this.isLoggedIn = true;
                        console.log("loged in!");
                    })
                        .catch(function (error) {
                        console.log("blabalba error!");
                        console.log(error);
                        _this.isLoggedIn = false;
                    });
                };
                AppComponent.prototype.onLogin = function () {
                    $('#loginDlg').modal();
                };
                AppComponent.prototype.onLogout = function () {
                    this.loginLocalService.logout();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<h1>My First Angular 2 App</h1>\n    <a (click)=\"onLogin()\" [hidden]='isLoggedIn'>login</a>\n    <a (click)=\"onLogout()\" [hidden]='!isLoggedIn'>logout</a>\n    <login-dialog dialogId=\"loginDlg\"></login-dialog>",
                        directives: [login_dialog_component_1.LoginDialogComponent],
                        providers: [login_local_service_1.LoginLocalService, social_appinfo_service_1.SocialAppInfoService]
                    }), 
                    __metadata('design:paramtypes', [login_local_service_1.LoginLocalService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map