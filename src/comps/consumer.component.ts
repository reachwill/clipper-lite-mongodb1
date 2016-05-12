import { Component }       from 'angular2/core';
import {YTConsumerPlayer} from './ytplayer.consumer.component';
import {Social} from './social.component';

declare var unescape:any;
declare var escape:any;
@Component({
  selector: 'my-consumer',
  directives: [YTConsumerPlayer,Social],
  template: `

    <yt-consumer-player [vidId]="_vidId" [start]="_start" [end]="_end"></yt-consumer-player>
    <social [shareURL]="_shareURL"></social>
   `

})
export class Consumer {
  _collectionURL:string = 'https://www.youtube.com/watch?v=';
  _vidId:string;
  _start:string;
  _end:string;
  _shareURL:string;
  _loadURLIsReady:boolean;

  constructor(){
      //retrieval of url params stored in props
      this._vidId = this.getQueryStringValue('id');
      this._start = this.getQueryStringValue('start');
      this._end = this.getQueryStringValue('end');
      //construct url to load video
      this._shareURL = 'http://localhost:3000/consumer?id='+this._vidId +'&start='+ this._start + '&end=' + this._end +'&version=3.0';
       // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
       if(this._shareURL.search("undefined")>-1){
           this._loadURLIsReady = false;
       }else{
           this._loadURLIsReady = true;
       }
       console.log(this._shareURL);
       //load video into videjs player

  }

  getQueryStringValue (key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }




}
