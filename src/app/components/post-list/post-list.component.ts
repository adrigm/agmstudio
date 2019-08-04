import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/cockpit/posts.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() slug: string;

  public posts: Post[] = [];
  public totalPosts$: Observable<number>;
  public loading = false;
  public postPerPage = new Array(environment.posts.postsPerPage);

  private page = 0;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    // this.loadPosts();

  }

  ngOnChanges(changes: SimpleChanges) {
    this.page = 0;
    this.posts = [];
    this.loadPosts();
  }

  public loadPosts() {
    this.loading = true;
    let obs: Observable<Post[]>;

    switch (this.type) {
      case 'category':
        this.totalPosts$ = this.postsService.getNumPostsOfCategory(this.slug)
        .pipe(tap( resp => resp || this.router.navigate(['/blog'])));
        obs = this.postsService.getPostsByCategorySlug( this.slug, { page: this.page, content: false } );
        break;
      case 'tag':
        this.totalPosts$ = this.postsService.getNumPostsOfTag(this.slug)
        .pipe(tap( resp => resp || this.router.navigate(['/blog'])));
        obs = this.postsService.getPostsByTagSlug( this.slug, { page: this.page, content: false } );
        break;
      default:
        this.totalPosts$ = this.postsService.getNumPosts()
        .pipe(tap( resp => resp || this.router.navigate(['/'])));
        obs = this.postsService.getPosts( { page: this.page, content: false } );
    }

    this.getPosts(obs);
  }

  private getPosts(obs: Observable<Post[]>) {
    obs
    .pipe(
      take(1)
    )
    .subscribe( posts => {
      this.posts.push(...posts);
      this.loading = false;
      this.page++;
    });
  }

  public goPost(slug: string) {
    this.router.navigate(['/', 'blog', 'post', slug]);
  }

}
