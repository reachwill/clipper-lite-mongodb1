System.register(['angular2/core', './search.component2', './bigred2.component', './ytplayer.component', './social.component', './copybox.component'], function(exports_1, context_1) {
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
    var core_1, search_component2_1, bigred2_component_1, ytplayer_component_1, social_component_1, copybox_component_1;
    var Editor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (search_component2_1_1) {
                search_component2_1 = search_component2_1_1;
            },
            function (bigred2_component_1_1) {
                bigred2_component_1 = bigred2_component_1_1;
            },
            function (ytplayer_component_1_1) {
                ytplayer_component_1 = ytplayer_component_1_1;
            },
            function (social_component_1_1) {
                social_component_1 = social_component_1_1;
            },
            function (copybox_component_1_1) {
                copybox_component_1 = copybox_component_1_1;
            }],
        execute: function() {
            Editor = (function () {
                function Editor(ref) {
                    console.log('editor created');
                    //set flag to check if _shareURLIsReady is worth sharing
                    this._shareURLIsReady = false;
                    this._vidId = this.getQueryStringValue('id');
                    this._ref = ref;
                }
                Editor.prototype.toggleSearch = function (event) {
                    event.preventDefault();
                    //hide / show searchBox component
                    $('#searchBox').toggle();
                };
                Editor.prototype.recordBtnClicked = function (event) {
                    console.log('record');
                    //toggle class to visually show state of recording start / end times
                    $('.player-container').toggleClass('red');
                    //depending on red class active either modify start time or end time
                    if ($('.player-container').hasClass('red')) {
                        this._start = String(videojs('#player').currentTime().toFixed(1));
                        this._int = setInterval(function () {
                            this._end = String(videojs('#player').currentTime().toFixed(1));
                            $('#endTime').val(this._end); //BAD temp fix !!!!!!!!!!!!!!!!
                            //this.ref.markForCheck();
                            console.log(this._end);
                        }, 100);
                    }
                    else {
                        clearInterval(this._int);
                        this._end = String(videojs('#player').currentTime().toFixed(1));
                        console.log(this._end);
                        videojs('#player').pause();
                    }
                    this._shareURL = 'http://www.youtube.com/v/' + this._vidId + '?start=' + this._start + '&end=' + this._end + '&autoplay=1';
                    // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
                    if (this._shareURL.search("undefined") > -1) {
                        this._shareURLIsReady = false;
                    }
                    else {
                        this._shareURLIsReady = true;
                    }
                    console.log(this._shareURL);
                };
                Editor.prototype.endBtnClicked = function (event) {
                    console.log('end');
                    clearInterval(this._int);
                    this._end = 'end=' + String(videojs('#player').currentTime().toFixed(1));
                    console.log(this._end);
                };
                Editor.prototype.startBtnClicked = function (event) {
                    console.log(this._ref);
                    console.log('start');
                    this._start = 'start=' + String(videojs('#player').currentTime().toFixed(1));
                    this._int = setInterval(function () {
                        this._end = 'end=' + String(videojs('#player').currentTime().toFixed(1));
                        $('#endTime').val(this._end); //temp fix
                        //this.ref.markForCheck();
                        // console.log(this._end)
                    }, 66);
                };
                Editor.prototype.updateEnd = function () {
                    console.log(String(videojs('#player').currentTime().toFixed(1)));
                };
                Editor.prototype.bigRedClicked = function (event) {
                    //$('#moveiplayer').loadVideo();
                    //toggle class to visually show state of recording start / end times
                    $('.player-container').toggleClass('red');
                    //depending on red class active either modify start time or end time
                    if ($('.player-container').hasClass('red')) {
                        this._start = 'start=' + Math.round(videojs('#player').currentTime());
                    }
                    else {
                        this._end = 'end=' + Math.round(videojs('#player').currentTime());
                    }
                    //this._shareURL = 'http://localhost:3000/consumer?id='+this._vidId + this._start + '&' + this._end +'&version=3.0';
                    this._shareURL = 'http://www.youtube.com/embed/' + this._vidId + '?start=' + this._start + '&end=' + this._end + '&autoplay=1';
                    //'http://www.youtube.com/embed/'+this._vidId+'?start='+this._start+'&end='+this._end+'&autoplay=1'
                    // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
                    if (this._shareURL.search("undefined") > -1) {
                        this._shareURLIsReady = false;
                    }
                    else {
                        this._shareURLIsReady = true;
                    }
                    console.log(this._shareURL);
                };
                Editor.prototype.searchResultClicked = function (event) {
                    //console.log(event.id)
                    videojs('#player').src({ "src": "https://www.youtube.com/watch?v=" + event.id });
                    videojs('#player').play();
                    //record current video url in public vidURL var ready with & for start end params
                    this._vidURL = videojs('#player').src().src + '&';
                    //record the unique id of th video
                    this._vidId = this._vidURL.substr(this._vidURL.lastIndexOf('?') + 3);
                    // toggle visiblity of searchBox component
                    $('#searchBox').fadeToggle();
                };
                Editor.prototype.getQueryStringValue = function (key) {
                    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
                };
                Editor.prototype.ngAfterViewChecked = function () {
                    //console.log(this._ref);
                    //this._ref.markForCheck();
                    // if (this.callback && this.clicked) {
                    //     console.log("changing status ...");
                    //     this.callback(Math.random());
                    // }
                };
                Editor = __decorate([
                    core_1.Component({
                        selector: 'my-editor',
                        changeDetection: core_1.ChangeDetectionStrategy.Default,
                        directives: [search_component2_1.Search, ytplayer_component_1.YTPlayer, bigred2_component_1.BigRedButton, social_component_1.Social, copybox_component_1.CopyBox],
                        template: "\n\n\n    <div id=\"edit-controls\">\n        <a href=\"#\" class=\"search\" (click)=\"toggleSearch($event)\"><span class=\"icon-search\"></span></a>\n    </div>\n\n    <yt-player [vidId]=\"_vidId\" #movieplayer></yt-player>\n    <big-red-button\n    [start]=\"_start\"\n    [end]=\"_end\"\n    (startBtnClicked)=\"startBtnClicked()\"\n    (endBtnClicked)=\"endBtnClicked()\"\n    (recordBtnClicked)=\"recordBtnClicked()\">\n    </big-red-button>\n\n    <copy-box [shareURL]=\"_shareURL\" [shareURLIsReady]=\"_shareURLIsReady\"></copy-box>\n    <social [shareURL]=\"_shareURL\"></social>\n\n    <search id=\"searchBox\" (^click)=\"searchResultClicked($event)\" (resultClicked)=\"searchResultClicked($event)\"></search>\n   "
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], Editor);
                return Editor;
            }());
            exports_1("Editor", Editor);
        }
    }
});
//# sourceMappingURL=editor.component.js.map