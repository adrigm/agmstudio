import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tag } from '../../interfaces/tag.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private headers = new HttpHeaders({
    'Cockpit-Token': environment.cockpit.token
  });
  private url = `${ environment.cockpit.url }/category`;

  constructor(
    private http: HttpClient,
  ) { }

  public getTags() {
    const body = {
      simple: 1,
    };

    return this.http.post<Tag[]>(this.url, body, { headers: this.headers });
  }

  public getTagByID(id: string) {
    const body = {
      filter: {
        _id: id
      },
      simple: 1,
    };

    return this.http.post<Tag[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( tag => tag.length > 0 ? tag[0] : null )
    );
  }

  public getTagBySlug(slug: string) {
    const body = {
      filter: {
        name_slug: slug
      },
      simple: 1,
    };

    return this.http.post<Tag[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( tag => tag.length > 0 ? tag[0] : null )
    );
  }
}
