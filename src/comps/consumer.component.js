System.register(['angular2/core', './ytplayer.consumer.component', './social.component'], function(exports_1, context_1) {
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
    var core_1, ytplayer_consumer_component_1, social_component_1;
    var Consumer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ytplayer_consumer_component_1_1) {
                ytplayer_consumer_component_1 = ytplayer_consumer_component_1_1;
            },
            function (social_component_1_1) {
                social_component_1 = social_component_1_1;
            }],
        execute: function() {
            Consumer = (function () {
                function Consumer() {
                    this._collectionURL = 'https://www.youtube.com/watch?v=';
                    //retrieval of url params stored in props
                    this._vidId = this.getQueryStringValue('id');
                    this._start = this.getQueryStringValue('start');
                    this._end = this.getQueryStringValue('end');
                    //construct url to load video
                    this._shareURL = 'http://localhost:3000/consumer?id=' + this._vidId + '&start=' + this._start + '&end=' + this._end + '&version=3.0';
                    // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
                    if (this._shareURL.search("undefined") > -1) {
                        this._loadURLIsReady = false;
                    }
                    else {
                        this._loadURLIsReady = true;
                    }
                    console.log(this._shareURL);
                    //load video into videjs player
                }
                Consumer.prototype.getQueryStringValue = function (key) {
                    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
                };
                Consumer = __decorate([
                    core_1.Component({
                        selector: 'my-consumer',
                        directives: [ytplayer_consumer_component_1.YTConsumerPlayer, social_component_1.Social],
                        template: "\n\n    <yt-consumer-player [vidId]=\"_vidId\" [start]=\"_start\" [end]=\"_end\"></yt-consumer-player>\n    <social [shareURL]=\"_shareURL\"></social>\n   "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Consumer);
                return Consumer;
            }());
            exports_1("Consumer", Consumer);
        }
    }
});
//# sourceMappingURL=consumer.component.js.map