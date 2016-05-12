import {Component, ElementRef, OnInit, OnDestroy, Input} from 'angular2/core';
declare var videojs:any;
@Component({
  selector: 'yt-player',

  template:`
  <div class="player-container">
    <video
        id="player"
        class="video-js vjs-default-skin"
        controls

        poster="media/clipper-logo-play-hires"
        data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=PaOYzsZdt5c"}] }'
    >
    </video>
  </div>
  `,
  styles:[`
    .player-dimensions{

    }
  `],

})
export class YTPlayer implements OnInit, OnDestroy {

    private _elementRef: ElementRef;
    private videoJSplayer : any;
    public _videoURL:string = 'https://www.youtube.com/watch?v=PaOYzsZdt5c';


    @Input() vidId: string;
    constructor(elementRef: ElementRef) {
    
        this._elementRef = elementRef;
    }

    ngOnInit() {
        console.log('Init - Component initialized')

        this.videoJSplayer = videojs(document.getElementById('player'), {}, function() {
            // This is functionally the same as the previous example.

        });
    }

     ngAfterViewInit() {
        console.log('Init - Component View initialized ');



        if(this.vidId!=undefined){
            this.videoJSplayer.src('http://www.youtube.com/embed/'+this.vidId)

        }

       // window.int=setInterval(function(){console.log(videojs('#player').readyState())},1000)



    }

    ngOnDestroy() {
        console.log('Deinit - Destroyed Component')
        this.videoJSplayer.dispose();
    }

    loadVideo() {
        console.log('load video');
    }

}
