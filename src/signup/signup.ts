import { Component } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import { contentHeaders } from '../common/headers';

declare var require:any;

let styles   = require('./signup.css');
let template = require('./signup.html');
let config = require('../common/config.json');

@Component({
  selector: 'signup',
  directives: [ RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})

export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password) {
    event.preventDefault();
    //prepare body of request object
    let body = JSON.stringify({ username, password });
    //send post request
    this.http.post(config.domain+':'+config.port+'/users', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.json().id_token);
          this.router.parent.navigateByUrl('/home');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }

}
