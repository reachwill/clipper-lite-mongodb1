import {Component, Output, EventEmitter} from 'angular2/core';
import {Control} from 'angular2/common';
import {YouTubeAPI} from './youtube-api/youtube';
import 'rxjs/Rx';


@Component({
  selector: 'search',
  providers: [YouTubeAPI],
  template:`
    <input [ngFormControl]="search" placeholder="search" value="eyhTxuMcYic">
    <ul>
            <li  *ngFor="#video of results | async">
                <a  href="#" data-id="{{video.id.videoId}}" (click)="itemClicked($event)">
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
  constructor(private youtube:YouTubeAPI) {
   //observable of results
   this.results =
   //input value change observable
    this.search.valueChanges
      .debounceTime(200) //debounce for 200ms
      .switchMap(query => youtube.search(query));
      //switchMap flattens the async and cancels the pending request if a new value is requested

  }

    @Output()
            resultClicked = new EventEmitter();

    itemClicked(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        this.resultClicked.next(event.currentTarget);
    }
}
