import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Page } from '../../interfaces/page-interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private headers = new HttpHeaders({
    'Cockpit-Token': environment.cockpit.token
  });
  private url = `${ environment.cockpit.url }/pages`;

  constructor(
    private http: HttpClient,
  ) { }

  public getPageByID(id: string): Observable<Page> {
    const body = {
      filter: {
        published: true,
        _id: id
      },
      simple: 1,
    };

    return this.http.post<Page[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( page => page.length > 0 ? page[0] : null )
    );
  }

  public getPageBySlug(slug: string): Observable<Page> {
    const body = {
      filter: {
        published: true,
        slug_name: slug
      },
      simple: 1,
    };

    return this.http.post<Page[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( page => page.length > 0 ? page[0] : null )
    );
  }
}
