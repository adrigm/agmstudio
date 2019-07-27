import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../../interfaces/post.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private headers: HttpHeaders;
  private url = `${ environment.cockpit.url }/posts`;

  private limit = environment.posts.postsPerPage;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Cockpit-Token': environment.cockpit.token
    });
  }

  public getPosts(
    page: number = 0,
    postsPerPage: number = this.limit
  ) {{
    const body = {
      filter: {
        published: true,
      },
      sort: { _created: -1 },
      limit: postsPerPage,
      skip: postsPerPage * page,
      simple: 1,
      populate: 1
    };

    return this.http.post<Post[]>(this.url, body, { headers: this.headers });
  }}

  public getNumPosts(): Observable<number> {
    const body = {
      filter: {
        published: true,
      },
      limit: 1,
      fields: { _id: 1 }
    };

    return this.http.post(this.url, body, { headers: this.headers })
    .pipe(
      map( (resp: any) => resp.total)
    );
  }
}
