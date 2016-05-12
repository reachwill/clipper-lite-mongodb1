System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    var BigRedButton;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BigRedButton = (function () {
                function BigRedButton() {
                    this.clicked = new core_1.EventEmitter();
                    console.log('big red created');
                }
                BigRedButton.prototype.bigRedClicked = function (event) {
                    event.preventDefault();
                    console.log(event);
                    this.clicked.next(event);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], BigRedButton.prototype, "clicked", void 0);
                BigRedButton = __decorate([
                    core_1.Component({
                        selector: 'big-red-button',
                        template: "\n    <a href=\"#\" id=\"bigRedBtn\" (click)=\"bigRedClicked($event)\">Record</a>\n  ",
                        styles: ["\n\n  "],
                    }), 
                    __metadata('design:paramtypes', [])
                ], BigRedButton);
                return BigRedButton;
            }());
            exports_1("BigRedButton", BigRedButton);
        }
    }
});
//# sourceMappingURL=bigred.component.js.map