import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'big-red-button',
  template:`
    <a href="#" id="bigRedBtn" (click)="bigRedClicked($event)">Record</a>
  `,
  styles:[`

  `],

})
export class BigRedButton  {
    constructor() {
        console.log('big red created');
    }

     @Output()
            clicked = new EventEmitter();

    bigRedClicked(event) {
        event.preventDefault();

        console.log(event);
        this.clicked.next(event);
    }
}
