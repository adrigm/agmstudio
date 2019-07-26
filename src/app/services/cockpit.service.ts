import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { map, filter } from 'rxjs/operators';
import { Tag } from '../interfaces/tag.interface';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CockpitService {
  private url =  'http://agmstudio.io/cockpit2/api/collections/get';
  private urlPost = `${ this.url }/posts`;
  private urlCategory = `${ this.url }/category`;
  private urlTag = `${ this.url }/tag`;
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
      },
      // fields: { title: 1, categories: 1 },
      sort: { _created: -1 },
      limit: this.postsPerPages,
      simple: 1,
      populate: 1
    };

    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers });
  }

  public getPostsByTagID(id: string) {
    const body = {
      filter: {
        published: true,
        $or: [{ 'tags.0._id': id }, { 'tags.1._id': id }, { 'tags.3._id': id }, { 'tags.4._id': id }]
      },
      // fields: { title: 1, categories: 1 },
      sort: { _created: -1 },
      limit: this.postsPerPages,
      simple: 1,
      populate: 1
    };
    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers });
  }

  public getPostsByCategoryID(id: string) {
    const body = {
      filter: {
        published: true,
        'categories._id': id
      },
      // fields: { title: 1, categories: 1 },
      sort: { _created: -1 },
      limit: this.postsPerPages,
      simple: 1,
      populate: 1
    };

    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers });
  }

  public getPostsByCategorySlug(slug: string) {
    const body = {
      filter: {
        published: true,
        'categories.name_slug': slug
      },
      // fields: { title: 1, categories: 1 },
      sort: { _created: -1 },
      limit: this.postsPerPages,
      simple: 1,
      populate: 1
    };

    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers });
  }

  public getPostBySlug(slug: string) {
    const body = {
      filter: {
        published: true,
        title_slug: slug
      },
      // fields: { title: 1, categories: 1 },
      sort: { _created: -1 },
      limit: 1,
      simple: 1,
      populate: 1
    };

    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers })
    .pipe(
      map( posts => posts.length > 0 ? posts[0] : null )
    );
  }

  public getPostByID(id: string) {
    const body = {
      filter: {
        published: true,
        _id: id
      },
      // fields: { title: 1, categories: 1 },
      sort: { _created: -1 },
      limit: 1,
      simple: 1,
      populate: 1
    };

    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers })
    .pipe(
      map( posts => posts.length > 0 ? posts[0] : null )
    );
  }

  public getPosts(body: any) {
    return this.http.post<Post[]>(this.urlPost, body, { headers: this.headers });
  }

  public getAllCategories() {
    const body = {
      simple: 1,
    };

    return this.http.post<Category[]>(this.urlCategory, body, { headers: this.headers });
  }

  public getCategoryByID(id: string) {
    const body = {
      filter: {
        _id: id
      },
      simple: 1,
    };

    return this.http.post<Category[]>(this.urlCategory, body, { headers: this.headers })
    .pipe(
      map( category => category.length > 0 ? category[0] : null )
    );
  }

  public getCategoryBySlug(slug: string) {
    const body = {
      filter: {
        name_slug: slug
      },
      simple: 1,
    };

    return this.http.post<Category[]>(this.urlCategory, body, { headers: this.headers })
    .pipe(
      map( category => category.length > 0 ? category[0] : null )
    );
  }

  public getAllTags() {
    const body = {
      simple: 1,
      populate: 1
    };

    return this.http.post<Tag[]>(this.urlTag, body, { headers: this.headers });
  }

  public getTagByID(id: string) {
    const body = {
      filter: {
        _id: id
      },
      simple: 1,
    };

    return this.http.post<Tag[]>(this.urlTag, body, { headers: this.headers })
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

    return this.http.post<Tag[]>(this.urlTag, body, { headers: this.headers })
    .pipe(
      map( tag => tag.length > 0 ? tag[0] : null )
    );
  }
}
