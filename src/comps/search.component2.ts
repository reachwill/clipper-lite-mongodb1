import {Component, Output, EventEmitter} from 'angular2/core';
import {Control} from 'angular2/common';
import {YouTubeService} from './services/youtube.service';
import {HTTP_PROVIDERS}  from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'search',
  providers: [YouTubeService,HTTP_PROVIDERS],
  template:`
   <input [ngFormControl]="search" placeholder="search">

    <ul>
            <li  *ngFor="#video of results | async">
                <a  href="#" data-id="{{video.id.videoId}}" (click)="itemClicked($event)" >
                    <h3>{{video.snippet.title}}</h3>
                    <p>{{video.snippet.description}}</p>
                    <img [src]="video.snippet.thumbnails.default.url"/>
                </a>
            </li>

    </ul>
  `,
  styles:[`

  `],

  
})
export class Search  {

   search = new Control();
   results: Observable<any>;
   constructor(public youtube:YouTubeService) {

//    //observable of results
    this.results =
//    //input value change observable
     this.search.valueChanges
       .debounceTime(200) //debounce for 200ms
       .switchMap(query => youtube.getResults(query));
//       //switchMap flattens the async and cancels the pending request if a new value is requested

   }

    @Output()
            resultClicked = new EventEmitter();

    itemClicked(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        this.resultClicked.next(event.currentTarget);
    }


}
