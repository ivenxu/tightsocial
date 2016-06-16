System.register(['angular2/core', '../common/pinterest/pin-sdk-loader', '../common/fb/fb-sdk-loader', './login-local.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, pin_sdk_loader_1, fb_sdk_loader_1, login_local_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (pin_sdk_loader_1_1) {
                pin_sdk_loader_1 = pin_sdk_loader_1_1;
            },
            function (fb_sdk_loader_1_1) {
                fb_sdk_loader_1 = fb_sdk_loader_1_1;
            },
            function (login_local_service_1_1) {
                login_local_service_1 = login_local_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(fbSDKLoader, pinSDKLoader, loginLocalService) {
                    this.loginLocalService = loginLocalService;
                    // loginLocalService.isLoggedIn();
                }
                LoginComponent.prototype.onPinLogin = function () {
                    var _this = this;
                    PDK.login({ scope: 'read_public,write_public,read_relationships,write_relationships' }, function (response) {
                        _this.pinLoginCallback(response);
                    });
                };
                LoginComponent.prototype.onFBLogin = function () {
                    var _this = this;
                    FB.login(function (response) {
                        _this.fbLoginCallback(response);
                    }, { scope: 'email,user_likes', return_scopes: true });
                };
                LoginComponent.prototype.onGGLogin = function () {
                    this.loginLocalService.handleGGAuthClick();
                };
                LoginComponent.prototype.pinLoginCallback = function (response) {
                    console.log('pin login callback.');
                    if (response.status == 'connected') {
                        console.log('Fetching your information....');
                        PDK.me(function (response) {
                            console.log('Successful login for: ' + response.first_name);
                        });
                    }
                };
                LoginComponent.prototype.fbLoginCallback = function (response) {
                    console.log('fb login callback');
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', function (response) {
                            console.log('Good to see you, ' + response.name + '.');
                        });
                    }
                    else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                };
                LoginComponent.prototype.ggLoginCallback = function (response) {
                    if (response && !response.error) {
                        gapi.client.load('plus', 'v1', function () {
                            var request = gapi.client.plus.people.get({
                                'userId': 'me'
                            });
                            request.execute(function (resp) {
                                console.log(resp);
                            });
                        });
                    }
                    else {
                        console.log("User cancelled login or did not fully authorize.");
                    }
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'html/components/logincomponent/login.component.html',
                        providers: [fb_sdk_loader_1.FBSDKLoader, pin_sdk_loader_1.PinSDKLoader]
                    }), 
                    __metadata('design:paramtypes', [fb_sdk_loader_1.FBSDKLoader, pin_sdk_loader_1.PinSDKLoader, login_local_service_1.LoginLocalService])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map