import {Component, Output, EventEmitter, Input, OnChanges,AfterViewChecked} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
  selector: 'big-red-button',
  template:`

<form form-horizontal role="form" >
  <div id="form-group">

  <!--  <a class="btn btn-error " href="#" id="recordBtn" (click)="btnClicked($event)" [ngClass]="{'icon-circle': !isRecording, 'icon-stop':isRecording }"></a>-->

    <input class="btn btn-success col-md-2 col-md-offset-3 col-sm-3 col-sm-offset-2 col-xs-12" type="button" id="startTime" value={{start}} (click)="btnClicked($event)">

    <input class="btn btn-danger col-md-2 col-md-offset-1 col-sm-3 col-xs-12 col-sm-offset-1" type="button" id="endTime" value={{end}} (click)="btnClicked($event)">

 </div>
</form>
  `,
  styles:[`

  `],

})
export class BigRedButton  {

    isRecording:boolean=false;
    constructor() {
        console.log('big red created');
        //setInterval(() => this.five5Secs.emit("event"), 1000);
    }



     @Input() start: string ;
     @Input() end: string ;


     @Output('startBtnClicked') startClicked = new EventEmitter();
     @Output('endBtnClicked') endClicked = new EventEmitter();
     @Output('recordBtnClicked') recordClicked = new EventEmitter();

    btnClicked(event) {
        event.preventDefault();
        this.isRecording = !this.isRecording;
        this.recordClicked.emit("event");
        // if(event.target.id=='startTime'){
        //     this.startClicked.emit("event");
        // }else if(event.target.id=='endTime'){
        //     this.endClicked.emit("event");
        // }else if(event.target.id=='recordBtn'){
        //     this.isRecording = !this.isRecording;
        //     this.recordClicked.emit("event");
        // }

    }

    ngOnChanges(changes) {
      //console.log('DDD'+changes);
    }

    ngAfterViewChecked() {
        //console.log(this.end);
        // if (this.callback && this.clicked) {
        //     console.log("changing status ...");
        //     this.callback(Math.random());
        // }
    }


}
