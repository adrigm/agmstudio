import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { PostFilters } from '../../interfaces/post-filters.interdace';
import { Post } from '../../interfaces/post.interface';
import { CategoryService } from './category.service';
import { TagsService } from './tags.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private headers = new HttpHeaders({
    'Cockpit-Token': environment.cockpit.token
  });
  private url = `${ environment.cockpit.url }/posts`;

  private limit = environment.posts.postsPerPage;

  constructor(
    private http: HttpClient,
    private tagsService: TagsService,
    private categoryService: CategoryService
  ) {}

  public getPosts(options: PostFilters = {}): Observable<Post[]> {

    const body = this.getPostOptions(options);

    return this.http.post<Post[]>(this.url, body, { headers: this.headers });
  }

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

  public getPostsByCategoryID(id: string, options: PostFilters = {}) {
    const body: any = this.getPostOptions(options);

    body.filter = {
      ...body.filter,
      'category._id': id
    };

    return this.http.post<Post[]>(this.url, body, { headers: this.headers });
  }

  public getPostsByCategorySlug(slug: string, options: PostFilters = {}): Observable<Post[]> {

    return this.categoryService.getCategoryBySlug(slug)
    .pipe(
      map( category => category ? category._id : '' ),
      switchMap( id => this.getPostsByCategoryID(id, options) )
    );
  }

  public getPostsByTagID(id: string, options: PostFilters = {}): Observable<Post[]> {
    const body: any = this.getPostOptions(options);

    body.filter = {
      ...body.filter,
      $or: [{ 'tags.0._id': id }, { 'tags.1._id': id }, { 'tags.3._id': id }, { 'tags.4._id': id }]
    };

    return this.http.post<Post[]>(this.url, body, { headers: this.headers });
  }

  public getPostsByTagSlug(slug: string, options: PostFilters = {}): Observable<Post[]> {

    return this.tagsService.getTagBySlug(slug)
    .pipe(
      map( tag => tag ? tag._id : '' ),
      switchMap( id => this.getPostsByTagID(id, options) )
    );
  }

  public getPostByID(id: string, options: PostFilters = {}): Observable<Post> {
    const body: any = this.getPostOptions(options);

    body.filter = {
      ...body.filter,
      _id: id
    };

    return this.http.post<Post[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( posts => posts.length > 0 ? posts[0] : null )
    );
  }

  public getPostBySlug(slug: string, options: PostFilters = {}): Observable<Post> {
    const body: any = this.getPostOptions(options);

    body.filter = {
      ...body.filter,
      title_slug: slug
    };

    return this.http.post<Post[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( posts => posts.length > 0 ? posts[0] : null )
    );
  }

  public getPostByUniqueSlug(slug: string, options: PostFilters = {}): Observable<Post> {
    const body: any = this.getPostOptions(options);

    body.filter = {
      ...body.filter,
      slug
    };

    return this.http.post<Post[]>(this.url, body, { headers: this.headers })
    .pipe(
      map( posts => posts.length > 0 ? posts[0] : null )
    );
  }

  private getPostOptions(options: PostFilters = {}) {
    const page = options.hasOwnProperty('page') ?  options.page : 0;
    const postsPerPage = options.hasOwnProperty('postPerPage') ?  options.postPerPage : this.limit;
    const content = options.hasOwnProperty('content') ? options.content : true;
    const simple = options.hasOwnProperty('simple') ?  options.simple : true;
    const populate = options.hasOwnProperty('populate') ?  options.populate : true;

    return {
      filter: {
        published: options.published || true,
      },
      fields: content ? null : { content: 0 },
      sort: { _created: -1 },
      limit: postsPerPage,
      skip: postsPerPage * page,
      simple: Number(simple),
      populate: Number(populate)
    };
  }
}
