import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class CockpitService {
  private url = 'http://agmstudio.io/cockpit2/api/collections/get/posts';
  private token = 'f2d1f54c3065ab355c88dce1d86cfc';

  headers: HttpHeaders;
  config: any;

  private postsPerPages = 2;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Cockpit-Token': this.token
    });
  }

  getAllPosts(): Observable<any> {

    const body = {
      filter: {
        published: true,
        // tags: {
        //   $in: ['test']
        // }
      },
      sort: { _created: -1 },
      limit: this.postsPerPages,
      simple: 1
    };

    return this.http.post(this.url, body, { headers: this.headers });
  }
}
