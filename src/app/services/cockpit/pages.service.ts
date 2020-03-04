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
  private url = `${ environment.cockpit.url }/pages`;

  constructor(
    private http: HttpClient,
  ) { }

  public getPages(): Observable<Page[]> {
    const body = {
      filter: {
        published: true,
      },
      simple: 1,
    };

    return this.http.post<Page[]>(this.url, body);
  }

  public getPageByID(id: string): Observable<Page> {
    const body = {
      filter: {
        published: true,
        _id: id
      },
      simple: 1,
    };

    return this.http.post<Page[]>(this.url, body)
    .pipe(
      map( page => page.length > 0 ? page[0] : null )
    );
  }

  public getPageBySlug(slug: string): Observable<Page> {
    const body = {
      filter: {
        published: true,
        title_slug: slug
      },
      simple: 1,
    };

    return this.http.post<Page[]>(this.url, body)
    .pipe(
      map( page => page.length > 0 ? page[0] : null )
    );
  }
}
