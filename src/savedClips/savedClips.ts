import { Component,Injectable } from 'angular2/core';
import { CORE_DIRECTIVES, NgFor } from 'angular2/common';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';
import { AuthHttp } from 'angular2-jwt';
import { Router, RouteData, RouterLink } from 'angular2/router';
import { contentHeaders } from '../common/headers';

// // Import NgFor directive
// import {NgFor} from 'angular2/common';







declare var require: any;
declare var $: any;
declare var videojs: any;
declare var window;
declare var videojs: any;
declare var escape: any;
declare var unescape: any;



let template = require('./savedClips.html');
let config = require('../common/config.json');

@Component({
    selector: 'savedClips',
    directives: [CORE_DIRECTIVES, RouterLink],
    template: template,
    providers: [HTTP_PROVIDERS]
})

@Injectable()
export class SavedClips {
    jwt: string;
    decodedJwt: string;
    response: string;
    api: string;


    _loggedIn: boolean;
    _logData: string;

    user: Object;
    userName: string = null;
    clips: Array<any>=[];
heroes = ['Windstorm', 'Bombasto', 'Magneta', 'Tornado'];

    constructor(public router: Router, public http: Http, public authHttp: AuthHttp, data: RouteData) {
        this._logData = (`${data.get('isLoggedIn')}`);
        this._loggedIn = this._logData != 'null';

        this.jwt = localStorage.getItem('jwt');
        this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
        //alert(this._logData!='null');
        if (this.decodedJwt != null) {
            this.user = this.decodedJwt;
            this.userName = this.user['name'];
            console.log(this.userName)
            this.getSavedClips();
        }

    }

    getSavedClips() {

        var obj = { "username": this.userName };
        let body = JSON.stringify(obj);
        this.http.post(config.domain + ':' + config.port + '/savedClips', body, { headers: contentHeaders })

            .subscribe(
            response => {
                this.clips = response.json();
                console.log(this.clips);

            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }


    getQueryStringValue(key) {
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }


    callAnonymousApi() {
        this._callApi('Anonymous', config.domain + ':' + config.port + '/api/random-quote');
    }

    callSecuredApi() {
        this._callApi('Secured', config.domain + ':' + config.port + '/api/protected/random-quote');
    }

    saveSecuredApi() {

        this._callApi('SecuredPost', config.domain + ':' + config.port + '/api/protected/save');
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
            var obj = { text: 'test' };
            // For protected routes, use AuthHttp
            this.authHttp.post(url, JSON.stringify(obj))
                .subscribe(
                response => this.response = response.text(),
                error => this.response = error.text()
                );
        }
    }
}
