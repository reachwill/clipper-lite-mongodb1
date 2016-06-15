import {Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../home/home';
import {Login} from '../login/login';
import {Signup} from '../signup/signup';
import {Editor} from '../editor/editor';

declare var require;

let template = require('./app.html');

@Component({
  selector: 'auth-app',
  template: template,
  directives: [ LoggedInRouterOutlet ]
})

@RouteConfig([
  { path: '/', redirectTo: ['/Home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/login', component: Login, as: 'Login' },
  { path: '/signup', component: Signup, as: 'Signup' },
  { path: '/editor', component: Editor, as: 'Editor', data: {isLoggedIn: localStorage.getItem('jwt')} }
])

export class App {
  public loggedIn=false;

  constructor(public router: Router) {
    if(localStorage.getItem('jwt')){
      this.loggedIn=true;
    }

  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }


}
