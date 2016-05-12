import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { Editor}      from './editor.component';


@Component({
  selector: 'my-app',
  template: `

   <router-outlet></router-outlet>

   `
,
   directives: [ROUTER_DIRECTIVES],
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
  }
])
export class AppComponent {
  constructor(){

  }
}
