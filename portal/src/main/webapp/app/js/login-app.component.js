System.register(['angular2/core', './components/logincomponent/login-dialog.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, login_dialog_component_1;
    var LoginAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_dialog_component_1_1) {
                login_dialog_component_1 = login_dialog_component_1_1;
            }],
        execute: function() {
            LoginAppComponent = (function () {
                function LoginAppComponent() {
                }
                LoginAppComponent.prototype.ngAfterViewInit = function () {
                    $("#loginDlg").modal();
                };
                LoginAppComponent = __decorate([
                    core_1.Component({
                        selector: 'login-app',
                        template: "<login-dialog dialogId=\"loginDlg\" backdrop=\"static\"></login-dialog>",
                        directives: [login_dialog_component_1.LoginDialogComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LoginAppComponent);
                return LoginAppComponent;
            })();
            exports_1("LoginAppComponent", LoginAppComponent);
        }
    }
});
//# sourceMappingURL=login-app.component.js.map