import {Component, Output, EventEmitter, Input, OnChanges,AfterViewChecked} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
  selector: 'big-red-button',
  template:`
  
  
  <div id="big-red-container">
  
    <a href="#" id="recordBtn" (click)="btnClicked($event)" [ngClass]="{'icon-circle': !isRecording, 'icon-stop':isRecording }"></a>
    
    <input id="startTime" value={{start}}>
   
    <input id="endTime" value={{end}}>
    
 </div>
    
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
    
     
            
     @Input() start: string;
     @Input() end: string;
    
     
     @Output('startBtnClicked') startClicked = new EventEmitter(); 
     @Output('endBtnClicked') endClicked = new EventEmitter();
     @Output('recordBtnClicked') recordClicked = new EventEmitter();
     
    btnClicked(event) {
        event.preventDefault();
        if(event.target.id=='startBtn'){
            this.startClicked.emit("event");
        }else if(event.target.id=='endBtn'){
            this.endClicked.emit("event");
        }else if(event.target.id=='recordBtn'){
            this.isRecording = !this.isRecording;
            this.recordClicked.emit("event");
        }
        
    }
    
    ngOnChanges(changes) {
      console.log('DDD'+changes);
    }
    
    ngAfterViewChecked() {
        //console.log(this.end);
        // if (this.callback && this.clicked) {
        //     console.log("changing status ...");
        //     this.callback(Math.random());
        // }
    }
    
    
}
