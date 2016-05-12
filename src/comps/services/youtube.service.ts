import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';


const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyBbeuQDIFpMxnDNxPWhXOEVMpaBzgyMBjY';


@Injectable()
export class YouTubeService {
  constructor (private http: Http) {}

  getResults (query) {
      
    return this.http.get(`${BASE_URL}?q=${query}%20-channel&maxResults=50&part=snippet,id&key=${API_TOKEN}`)
                    .map(res => res.json().items)
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  
  
}