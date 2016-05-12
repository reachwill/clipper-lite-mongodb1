import {Http, HTTP_BINDINGS, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyBbeuQDIFpMxnDNxPWhXOEVMpaBzgyMBjY';


@Injectable()
export class YouTubeAPI {
  constructor(private http:Http){}
  
  
  search(query){
      var results = this.http.get(`${BASE_URL}?q=${query}%20-channel&maxResults=50&part=snippet,id&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
      
    return results;
  }
}