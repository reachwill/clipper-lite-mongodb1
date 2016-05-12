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
    var YTConsumerPlayer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            YTConsumerPlayer = (function () {
                function YTConsumerPlayer(elementRef) {
                    this._videoURL = 'https://www.youtube.com/watch?v=PaOYzsZdt5c';
                    this._elementRef = elementRef;
                }
                YTConsumerPlayer.prototype.urlClicked = function ($event) {
                    console.log("https://www.youtube.com/watch?v=" + this.vidId);
                };
                YTConsumerPlayer.prototype.ngAfterViewInit = function () {
                    console.log('Init - Component View initialized ' + this.vidId);
                    //System.import('../vendors/youtubeConsumer.js').then(alert('cunt');
                };
                YTConsumerPlayer.prototype.ngOnInit = function () {
                    console.log('Init - Component initialized ' + this.vidId);
                };
                YTConsumerPlayer.prototype.ngOnDestroy = function () {
                    console.log('Deinit - Destroyed Component');
                    //this.videoJSplayer.dispose();
                };
                YTConsumerPlayer.prototype.loadVideo = function () {
                    console.log('load video');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], YTConsumerPlayer.prototype, "vidId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], YTConsumerPlayer.prototype, "end", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], YTConsumerPlayer.prototype, "start", void 0);
                YTConsumerPlayer = __decorate([
                    core_1.Component({
                        selector: 'yt-consumer-player',
                        template: "\n  <div id=\"player\"> </div>\n  ",
                        styles: [],
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], YTConsumerPlayer);
                return YTConsumerPlayer;
            }());
            exports_1("YTConsumerPlayer", YTConsumerPlayer);
        }
    }
});
//# sourceMappingURL=ytplayer.consumer.component.js.map