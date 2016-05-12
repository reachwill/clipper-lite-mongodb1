import {Component, ElementRef, OnInit, OnDestroy, Input} from 'angular2/core';

@Component({
  selector: 'yt-consumer-player',

  template:`
  <div id="player"> </div>
  `,
  styles:[],
  
})
export class YTConsumerPlayer implements OnInit, OnDestroy {

    private _elementRef: ElementRef;
    private videoJSplayer : VideoJSPlayer;
    public _videoURL:string = 'https://www.youtube.com/watch?v=PaOYzsZdt5c';

    @Input() vidId: string;
    @Input() end: string;
    @Input() start: string;    
    constructor(elementRef: ElementRef) {
        
        this._elementRef = elementRef;
        
    }
    
    urlClicked($event){
       console.log("https://www.youtube.com/watch?v="+this.vidId);
    }
    
    ngAfterViewInit() {
        console.log('Init - Component View initialized ' + this.vidId);
         //System.import('../vendors/youtubeConsumer.js').then(alert('cunt');
    }
    
   
    ngOnInit() {
        console.log('Init - Component initialized ' + this.vidId); 
    }

    ngOnDestroy() {
        console.log('Deinit - Destroyed Component')
        //this.videoJSplayer.dispose();
    }
    
    loadVideo() {
        console.log('load video');
    }
    
}
