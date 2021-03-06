import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../../interfaces/category.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = `${ environment.cockpit.url }/category`;

  constructor(
    private http: HttpClient,
  ) { }

  public getCategories(): Observable<Category[]> {
    const body = {
      simple: 1,
    };

    return this.http.post<Category[]>(this.url, body);
  }

  public getCategoryByID(id: string): Observable<Category> {
    const body = {
      filter: {
        _id: id
      },
      simple: 1,
    };

    return this.http.post<Category[]>(this.url, body)
    .pipe(
      map( category => category.length > 0 ? category[0] : null )
    );
  }

  public getCategoryBySlug(slug: string): Observable<Category> {
    const body = {
      filter: {
        name_slug: slug
      },
      simple: 1,
    };

    return this.http.post<Category[]>(this.url, body)
    .pipe(
      map( category => category.length > 0 ? category[0] : null )
    );
  }
}
