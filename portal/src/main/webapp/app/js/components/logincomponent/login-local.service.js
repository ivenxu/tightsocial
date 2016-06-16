System.register(['angular2/core', './social-appinfo.service', '../common/fb/fb-util', '../common/gg/gg-util', '../common/pin/pin-util'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, social_appinfo_service_1, fb_util_1, gg_util_1, pin_util_1;
    var LOGIN_TOKEN_KEY, GAPI_URL, GAPI_SCOPES, LoginLocalService, LoginToken, LoginType;
    function handleGGClientLoad() {
        gg_util_1.GGUtil.setApiKey();
        if (!window.angularComponentRef) {
            setTimeout(handleGGClientLoad, 10);
        }
        else {
            window.angularComponentRef.zone.run(function () { window.angularComponentRef.component.handleGGClientLoad(); });
        }
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (social_appinfo_service_1_1) {
                social_appinfo_service_1 = social_appinfo_service_1_1;
            },
            function (fb_util_1_1) {
                fb_util_1 = fb_util_1_1;
            },
            function (gg_util_1_1) {
                gg_util_1 = gg_util_1_1;
            },
            function (pin_util_1_1) {
                pin_util_1 = pin_util_1_1;
            }],
        execute: function() {
            exports_1("LOGIN_TOKEN_KEY", LOGIN_TOKEN_KEY = "LOGIN_TOKEN_KEY");
            GAPI_URL = "https://apis.google.com/js/client.js";
            GAPI_SCOPES = 'https://www.googleapis.com/auth/userinfo.profile';
            (function (d, s, id, cb) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id))
                    return;
                js = d.createElement(s);
                js.id = id;
                js.src = GAPI_URL + "?onload=" + cb;
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'gapi_auth', 'handleGGClientLoad');
            LoginLocalService = (function () {
                function LoginLocalService(soicalAppInfoService, ngZone) {
                    var _this = this;
                    this.soicalAppInfoService = soicalAppInfoService;
                    window.angularComponentRef = {
                        zone: ngZone,
                        handleGGClientLoad: function () { return _this.handleGGClientLoad(); },
                        component: this
                    };
                    this.getSocialAppInfo();
                }
                LoginLocalService.prototype.isLoggedIn = function () {
                    var storedToken = sessionStorage.getItem(LOGIN_TOKEN_KEY);
                    if (storedToken) {
                        return true;
                    }
                    else {
                        var pinSession = PDK.getSession();
                        if (pinSession) {
                            this.fetchPinSession(pinSession);
                            return true;
                        }
                        var fbSession = FB.getAuthResponse();
                        if (fbSession) {
                            console.log(fbSession);
                        }
                        return false;
                    }
                };
                LoginLocalService.prototype.logout = function () {
                    console.log("log demm out!");
                    var storedTokenStr = sessionStorage.getItem(LOGIN_TOKEN_KEY);
                    if (storedTokenStr) {
                        var storedToken = LoginToken.fromJson(storedTokenStr);
                        switch (storedToken.loginType) {
                            case LoginType.GG:
                                this.ggLogout();
                            case LoginType.PN:
                                PDK.logout();
                            default:
                                console.log("not implmented yet!");
                        }
                    }
                };
                LoginLocalService.prototype.getLoginToken = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        console.log("getLoginToken");
                        var storedToken = sessionStorage.getItem(LOGIN_TOKEN_KEY);
                        if (storedToken) {
                            console.log("has loged in");
                            resolve(LoginToken.fromJson(sessionStorage.getItem(LOGIN_TOKEN_KEY)));
                        }
                        else {
                            console.log("try get status");
                            _this.getSocialAppInfo().then(function (appInfo) {
                                var pinSession = PDK.getSession();
                                if (pinSession) {
                                    _this.fetchPinUserInfo(pinSession).then(function (token) {
                                        resolve(token);
                                    });
                                }
                                _this.fetchFBAuthStatus().then(function (token) {
                                    resolve(token);
                                });
                            });
                        }
                    });
                };
                LoginLocalService.prototype.handleGGClientLoad = function () {
                    this.checkGGAuth();
                };
                LoginLocalService.prototype.handleGGAuthClick = function () {
                    gapi.auth.authorize({ client_id: window.ggAsyncInit.clientId, scope: GAPI_SCOPES, cookie_policy: 'single_host_origin', immediate: false }, this.handleGGAuthResult);
                };
                LoginLocalService.prototype.ggLogout = function () {
                    // need to revoke token to sigout google
                    // http://stackoverflow.com/questions/22086301/gapi-auth-signout-not-working-im-lost
                    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + gapi.auth.getToken().access_token;
                    $.ajax({ type: 'GET',
                        url: revokeUrl,
                        async: false,
                        contentType: "application/json",
                        dataType: 'jsonp',
                        success: function (nullResponse) { },
                        error: function (e) { }
                    });
                    gapi.auth.setToken(null);
                    gapi.auth.signOut();
                };
                LoginLocalService.prototype.getSocialAppInfo = function () {
                    var _this = this;
                    if (this.appInfo) {
                        return new Promise(function (resolve) { return resolve(_this.appInfo); });
                    }
                    else {
                        var promise = this.soicalAppInfoService.getSocialAppInfo();
                        promise.then(function (appInfo) {
                            _this.appInfo = appInfo;
                            fb_util_1.FBUtil.configSDK(appInfo.fbAppId);
                            gg_util_1.GGUtil.configSDK(appInfo.ggApiKey, appInfo.ggClientId);
                            pin_util_1.PinUtil.configSDK(appInfo.pinAppId);
                        });
                        return promise;
                    }
                };
                LoginLocalService.prototype.checkGGAuth = function () {
                    gapi.auth.authorize({ client_id: window.ggAsyncInit.clientId, scope: GAPI_SCOPES, cookie_policy: 'single_host_origin', immediate: true }, this.handleGGAuthResult);
                };
                LoginLocalService.prototype.handleGGAuthResult = function (authResult) {
                    if (authResult && !authResult.error) {
                        console.log(authResult);
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
                        console.log("error.....");
                    }
                };
                LoginLocalService.prototype.fetchPinUserInfo = function (pinSession) {
                    return new Promise(function (resolve, reject) {
                        PDK.me(function (response) {
                            if (response && response.data) {
                                var uid = response.data.id;
                                var pinToken = new LoginToken(LoginType.PN, uid, pinSession.accessToken, pinSession.scope);
                                sessionStorage.setItem(LOGIN_TOKEN_KEY, pinToken.toString());
                                resolve(LoginToken.fromJson(sessionStorage.getItem(LOGIN_TOKEN_KEY)));
                            }
                            else {
                                reject("PDK.me error!");
                            }
                        });
                    });
                };
                LoginLocalService.fetchFBUserInfo = function (authResponse) {
                    console.log("fetchFBUserInfo");
                    return new Promise(function (resolve, reject) {
                        FB.api('/me', function (response) {
                            console.log(response);
                            if (response) {
                                var fbToken = new LoginToken(LoginType.FB, "uid", "yyy", "xx.xx");
                                sessionStorage.setItem(LOGIN_TOKEN_KEY, fbToken.toString());
                                resolve(LoginToken.fromJson(sessionStorage.getItem(LOGIN_TOKEN_KEY)));
                            }
                            else {
                                reject("FB.api(/me) error!");
                            }
                        });
                    });
                };
                LoginLocalService.prototype.fetchFBAuthStatus = function () {
                    console.log("fetchFBAuthStatus");
                    return new Promise(function (resolve, reject) {
                        console.log("before FB.getLoginStatus!");
                        FB.getLoginStatus(function (response) {
                            console.log(response);
                            if (response) {
                                LoginLocalService.fetchFBUserInfo(response).then(function (token) {
                                    resolve(token);
                                });
                            }
                            else {
                                console.log("FB.getLoginStatus error!");
                                reject("FB.getLoginStatus error!");
                            }
                        });
                    });
                };
                LoginLocalService.prototype.fetchPinSession = function (pinSession) {
                    PDK.me(function (response) {
                        var uid = response.data.id;
                        var pinToken = new LoginToken(LoginType.PN, uid, pinSession.accessToken, pinSession.scope);
                        sessionStorage.setItem(LOGIN_TOKEN_KEY, pinToken.toString());
                    });
                    console.log(sessionStorage.getItem(LOGIN_TOKEN_KEY));
                };
                LoginLocalService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [social_appinfo_service_1.SocialAppInfoService, core_1.NgZone])
                ], LoginLocalService);
                return LoginLocalService;
            })();
            exports_1("LoginLocalService", LoginLocalService);
            LoginToken = (function () {
                function LoginToken(loginType, uid, token, scope) {
                    this.loginType = loginType;
                    this.uid = uid;
                    this.token = token;
                    this.scope = scope;
                }
                LoginToken.fromJson = function (json) {
                    var data = JSON.parse(json);
                    return new LoginToken(data.loginType, data.uid, data.token, data.scope);
                };
                LoginToken.prototype.toString = function () {
                    return JSON.stringify(this);
                };
                return LoginToken;
            })();
            exports_1("LoginToken", LoginToken);
            (function (LoginType) {
                LoginType[LoginType["LC"] = "LC"] = "LC";
                LoginType[LoginType["FB"] = "FB"] = "FB";
                LoginType[LoginType["PN"] = "PN"] = "PN";
                LoginType[LoginType["TW"] = "TW"] = "TW";
                LoginType[LoginType["GG"] = "GG"] = "GG";
            })(LoginType || (LoginType = {}));
            exports_1("LoginType", LoginType);
        }
    }
});
//# sourceMappingURL=login-local.service.js.map