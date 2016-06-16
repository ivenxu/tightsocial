System.register(['angular2/platform/browser', './login-app.component'], function(exports_1) {
    var browser_1, login_app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (login_app_component_1_1) {
                login_app_component_1 = login_app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(login_app_component_1.LoginAppComponent);
        }
    }
});
//# sourceMappingURL=login.js.map