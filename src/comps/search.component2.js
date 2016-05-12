System.register(['angular2/core', 'angular2/common', './services/youtube.service', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, common_1, youtube_service_1, http_1;
    var Search;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (youtube_service_1_1) {
                youtube_service_1 = youtube_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Search = (function () {
                function Search(youtube) {
                    this.youtube = youtube;
                    this.search = new common_1.Control();
                    this.resultClicked = new core_1.EventEmitter();
                    //    //observable of results
                    this.results =
                        //    //input value change observable
                        this.search.valueChanges
                            .debounceTime(200) //debounce for 200ms
                            .switchMap(function (query) { return youtube.getResults(query); });
                    //       //switchMap flattens the async and cancels the pending request if a new value is requested
                }
                Search.prototype.itemClicked = function (event) {
                    event.preventDefault();
                    console.log(event.currentTarget);
                    this.resultClicked.next(event.currentTarget);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], Search.prototype, "resultClicked", void 0);
                Search = __decorate([
                    core_1.Component({
                        selector: 'search',
                        providers: [youtube_service_1.YouTubeService, http_1.HTTP_PROVIDERS],
                        template: "\n   <input [ngFormControl]=\"search\" placeholder=\"search\">\n   \n    <ul>\n            <li  *ngFor=\"#video of results | async\">\n                <a  href=\"#\" data-id=\"{{video.id.videoId}}\" (click)=\"itemClicked($event)\" >\n                    <h3>{{video.snippet.title}}</h3>\n                    <p>{{video.snippet.description}}</p>\n                    <img [src]=\"video.snippet.thumbnails.default.url\"/>\n                </a>\n            </li>\n       \n    </ul>\n  ",
                        styles: ["\n    \n  "],
                    }), 
                    __metadata('design:paramtypes', [youtube_service_1.YouTubeService])
                ], Search);
                return Search;
            }());
            exports_1("Search", Search);
        }
    }
});
//# sourceMappingURL=search.component2.js.map