import {Component,Input} from 'angular2/core';

@Component({
  selector: 'copy-box',
  template:`
  
    <input onClick="this.select();" readonly *ngIf="shareURLIsReady" id="copy-input" value="{{shareURL}}">
    
  `,
  styles:[`
    
  `],
  
})
export class CopyBox  {
    @Input() shareURL: string;
     @Input() shareURLIsReady: string;
    
    constructor() {
        console.log('copy box created');
    }
    
     
    
}
