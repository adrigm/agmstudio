import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CockpitService {
  private url = 'http://agmstudio.io/cockpit2/api/collections/get/posts';
  private token = 'f2d1f54c3065ab355c88dce1d86cfc';

  constructor(
    private http: HttpClient
  ) { }

  getAllPosts() {

    const headers = new HttpHeaders({
      'Cockpit-Token': this.token
    });

    const body = {
      filter: {
        published: true,
        tags: {
          $in: ['test']
        }
      },
      simple: 1
    };

    return this.http.post(this.url, body, { headers });
  }
}
