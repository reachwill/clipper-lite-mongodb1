System.register(['angular2/http', 'angular2/core'], function(exports_1, context_1) {
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
    var http_1, core_1;
    var BASE_URL, API_TOKEN, YouTubeAPI;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
            API_TOKEN = 'AIzaSyBbeuQDIFpMxnDNxPWhXOEVMpaBzgyMBjY';
            YouTubeAPI = (function () {
                function YouTubeAPI(http) {
                    this.http = http;
                }
                YouTubeAPI.prototype.search = function (query) {
                    var results = this.http.get(BASE_URL + "?q=" + query + "%20-channel&maxResults=50&part=snippet,id&key=" + API_TOKEN)
                        .map(function (res) { return res.json(); })
                        .map(function (json) { return json.items; });
                    return results;
                };
                YouTubeAPI = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], YouTubeAPI);
                return YouTubeAPI;
            }());
            exports_1("YouTubeAPI", YouTubeAPI);
        }
    }
});
//# sourceMappingURL=youtube.js.map