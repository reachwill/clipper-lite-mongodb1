import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Editor}      from './editor.component';
import { Consumer}      from './consumer.component';
import {Social} from './social.component';
@Component({
  selector: 'my-app',
  template: `
   <div id="top-bar"></div>
   <a [routerLink]="['Editor']">Editor</a>
   
   <router-outlet></router-outlet>
   
   `
,
   directives: [ROUTER_DIRECTIVES,Social],
   providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
  {
    path: '/',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/consumer',
    name: 'Consumer',
    component: Consumer
  }
])
export class AppComponent {
  constructor(){
    
  }
}