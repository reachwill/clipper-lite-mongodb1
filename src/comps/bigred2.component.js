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
                    this.isRecording = false;
                    this.startClicked = new core_1.EventEmitter();
                    this.endClicked = new core_1.EventEmitter();
                    this.recordClicked = new core_1.EventEmitter();
                    console.log('big red created');
                    //setInterval(() => this.five5Secs.emit("event"), 1000);
                }
                BigRedButton.prototype.btnClicked = function (event) {
                    event.preventDefault();
                    if (event.target.id == 'startBtn') {
                        this.startClicked.emit("event");
                    }
                    else if (event.target.id == 'endBtn') {
                        this.endClicked.emit("event");
                    }
                    else if (event.target.id == 'recordBtn') {
                        this.isRecording = !this.isRecording;
                        this.recordClicked.emit("event");
                    }
                };
                BigRedButton.prototype.ngOnChanges = function (changes) {
                    console.log('DDD' + changes);
                };
                BigRedButton.prototype.ngAfterViewChecked = function () {
                    //console.log(this.end);
                    // if (this.callback && this.clicked) {
                    //     console.log("changing status ...");
                    //     this.callback(Math.random());
                    // }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], BigRedButton.prototype, "start", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], BigRedButton.prototype, "end", void 0);
                __decorate([
                    core_1.Output('startBtnClicked'), 
                    __metadata('design:type', Object)
                ], BigRedButton.prototype, "startClicked", void 0);
                __decorate([
                    core_1.Output('endBtnClicked'), 
                    __metadata('design:type', Object)
                ], BigRedButton.prototype, "endClicked", void 0);
                __decorate([
                    core_1.Output('recordBtnClicked'), 
                    __metadata('design:type', Object)
                ], BigRedButton.prototype, "recordClicked", void 0);
                BigRedButton = __decorate([
                    core_1.Component({
                        selector: 'big-red-button',
                        template: "\n  \n  \n  <div id=\"big-red-container\">\n  \n    <a href=\"#\" id=\"recordBtn\" (click)=\"btnClicked($event)\" [ngClass]=\"{'icon-circle': !isRecording, 'icon-stop':isRecording }\"></a>\n    \n    <input id=\"startTime\" value={{start}}>\n   \n    <input id=\"endTime\" value={{end}}>\n    \n </div>\n    \n  ",
                        styles: ["\n    \n  "],
                    }), 
                    __metadata('design:paramtypes', [])
                ], BigRedButton);
                return BigRedButton;
            }());
            exports_1("BigRedButton", BigRedButton);
        }
    }
});
//# sourceMappingURL=bigred2.component.js.map