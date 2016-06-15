import { Component, Input } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router,RouteData } from 'angular2/router';
import { contentHeaders } from '../common/headers';

import { Search } from '../comps/search.component3';
import {BigRedButton} from '../comps/bigred2.component';
import {YTPlayer} from '../comps/ytplayer.component';
import {CopyBox} from '../comps/copybox.component';





declare var require:any;
declare var $:any;
declare var videojs:any;
declare var window;
declare var videojs:any;
declare var escape:any;
declare var unescape:any;



let template = require('./editor.html');
let config = require('../common/config.json');

@Component({
  selector: 'editor',
  directives: [CORE_DIRECTIVES,BigRedButton,Search,YTPlayer,CopyBox],
  template: template
})

export class Editor {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;

  _vidURL:string;
  _vidId:string;
  _start:string= 'Start';
  _end:string= 'Stop';
  _shareURL:string;
  _shareURLIsReady:boolean;
  _int;
  _ref;

  _loggedIn:boolean;
  _logData:string;

  user:Object;
  userName:string = null;



  constructor(public router: Router, public http: Http, public authHttp: AuthHttp,data: RouteData) {
    this._logData=(`${data.get('isLoggedIn')}`);
    this._loggedIn = this._logData!='null';

    this.jwt = localStorage.getItem('jwt');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
//alert(this._logData!='null');
    if(this.decodedJwt!=null){
      this.user = this.decodedJwt;
      this.userName = this.user['name'];
      console.log(this.userName)
    }

  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.parent.navigateByUrl('/login');
  }

  toggleSearch(event){
      event.preventDefault();
      //hide / show searchBox component
      //$('#searchBox').slideToggle();
  }

  save(event, username) {
    event.preventDefault();
    let body = JSON.stringify({userName: this.userName});
    console.log(body);

    this.http.post(config.domain+':'+config.port+'/clip/save', body, { headers: contentHeaders })
      .subscribe(
        response => {
          //localStorage.setItem('jwt', response.json().id_token);
          //this.router.parent.navigateByUrl('/editor');
          console.log(response.json());
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  recordBtnClicked(event){
      console.log('record');

       //toggle class to visually show state of recording start / end times
      $('.player-container').toggleClass('red');

      //depending on red class active either modify start time or end time
      if($('.player-container').hasClass('red')){
          this._start = String(videojs('#player').currentTime().toFixed(1));
          this._int=setInterval(function(){
                this._end = String(videojs('#player').currentTime().toFixed(1));
                $('#endTime').val(this._end)//BAD temp fix !!!!!!!!!!!!!!!!

              },100);
      }else{
          clearInterval(this._int);
          this._end = String(videojs('#player').currentTime().toFixed(1));

          videojs('#player').pause()
      }
     this._shareURL = 'http://www.youtube.com/v/'+this._vidId+'?start='+this._start+'&end='+this._end+'&autoplay=1';
     // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
     if(this._shareURL.search("undefined")>-1||this._shareURL.search("Start")>-1||this._shareURL.search("Stop")>-1){
         this._shareURLIsReady = false;
     }else{
         this._shareURLIsReady = true;
         //save to mongoDB via secured API
         //this.saveSecuredApi();
     }
     console.log(this._shareURL);
  }



  updateEnd(){
      console.log(String(videojs('#player').currentTime().toFixed(1)));
  }



   searchResultClicked(event){
      //console.log(event.id)
      videojs('#player').src({"src":"https://www.youtube.com/watch?v="+event.id});
      videojs('#player').play();
      //record current video url in public vidURL var ready with & for start end params
      this._vidURL = videojs('#player').src().src + '&';
      //record the unique id of th video
      this._vidId = this._vidURL.substr(this._vidURL.lastIndexOf('?')+3);
      // toggle visiblity of searchBox component
      //$('#searchBox').fadeToggle();
  }

  getQueryStringValue (key) {
      return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }


  callAnonymousApi() {
    this._callApi('Anonymous', config.domain+':'+config.port+'/api/random-quote');
  }

  callSecuredApi() {
    this._callApi('Secured', config.domain+':'+config.port+'/api/protected/random-quote');
  }

  saveSecuredApi() {

    this._callApi('SecuredPost', config.domain+':'+config.port+'/api/protected/save');
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this.authHttp.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'SecuredPost') {
      var obj = {text:'test'};
      // For protected routes, use AuthHttp
      this.authHttp.post(url,JSON.stringify(obj))
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }
}
