import { AfterViewChecked, Component, OnInit, OnDestroy } from '@angular/core';

import { HighlightService } from '../../services/highlight-service.service';
import { ScrollService } from '../../services/scroll.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Post } from '../../interfaces/post.interface';
import { Subscription, Observable } from 'rxjs';
import { PostsService } from '../../services/cockpit/posts.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, AfterViewChecked, OnDestroy {

  posts: Post[] = [];
  post: Observable<Post> = null;
  highlighted = false;
  postsSubscribe: Subscription = new Subscription();

  postList: Observable<Post[]>;

  page = 1;
  totalPosts: number;
  loading = false;
  postPerPages = environment.posts.postsPerPage;

  constructor(
    private router: ActivatedRoute,
    private highlightService: HighlightService,
    private postsService: PostsService
  ) { }

  public ngOnInit() {
    this.getPostsList();

    // this.postsSubscribe = this.postsService.getPosts({ content: false })
    // .subscribe( (posts: Post[]) => {
    //   this.posts.push(...posts);
    // });

    this.postsService.getNumPosts()
    .subscribe( num => this.totalPosts = num);

  }

  private getPostsList() {
    this.router.params
    .subscribe( params => {
      const type = params['type'] || '';
      const id = params['id'] || '';

      switch (type) {
        case 'post':
          this.post = this.postsService.getPostBySlug(id);
          break;
        case 'category':
          this.postList = this.postsService.getPostsByCategorySlug(id, { content: false, page: this.page });
          break;
        case 'tag':
          break;
        default:
          break;
      }
    });
  }

  public loadPage() {
    this.loading = true;
    this.postsService.getPosts({ page: this.page })
    .subscribe( (posts: Post[]) => {
      this.posts.push(...posts);
      this.page++;
      this.loading = false;
      console.log(this.posts);
    });
  }

  public ngAfterViewChecked(): void {
    if (this.posts && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  public ngOnDestroy(): void {
    this.postsSubscribe.unsubscribe();
  }
}
