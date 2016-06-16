System.register(['angular2/core', './login.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, login_component_1;
    var LoginDialogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            LoginDialogComponent = (function () {
                function LoginDialogComponent() {
                    this.show = true;
                    this.backdrop = "true";
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], LoginDialogComponent.prototype, "dialogId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], LoginDialogComponent.prototype, "show", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], LoginDialogComponent.prototype, "backdrop", void 0);
                LoginDialogComponent = __decorate([
                    core_1.Component({
                        selector: 'login-dialog',
                        template: "<div [id]=\"dialogId\" [attr.data-show]=\"show\" [attr.data-backdrop]=\"backdrop\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog login-container-xs login-container-sm login-container-md login-container-lg\" role=\"document\">\n        <div class=\"modal-content\">\n          <div class=\"modal-body\">\n            <login></login>\n          </div>\n        </div>\n    </div>\n  </div>",
                        directives: [login_component_1.LoginComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LoginDialogComponent);
                return LoginDialogComponent;
            })();
            exports_1("LoginDialogComponent", LoginDialogComponent);
        }
    }
});
//# sourceMappingURL=login-dialog.component.js.map