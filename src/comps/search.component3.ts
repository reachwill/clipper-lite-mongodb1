import {Component, Output, EventEmitter} from 'angular2/core';
import {Control} from 'angular2/common';
import {YouTubeService} from './services/youtube.service';
import {HTTP_PROVIDERS}  from 'angular2/http';
import { Observable } from 'rxjs/Observable';

declare var $:any;

@Component({
  selector: 'search',
  providers: [YouTubeService,HTTP_PROVIDERS],
  directives: [],
  template: `
  <div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

  <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <form form-horizontal role="form" >
          <input  class="form-control youtube-search" [ngFormControl]="search" placeholder="search youtube">
          </form>
        </div>
        <div class="modal-body">
        <ul>
        <li  *ngFor="#video of results | async" >
            <a  href="#" data-id="{{video.id.videoId}}" (click)="itemClicked($event)" >
                <h3>{{video.snippet.title}}</h3>
                <p>{{video.snippet.description}}</p>
                <img [src]="video.snippet.thumbnails.default.url"/>
            </a>
        </li>

        </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>






    </div>
    </div>
  `




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
        //console.log(event.currentTarget);
        $('#myModal').modal('hide')


        this.resultClicked.next(event.currentTarget);
    }


}
