import { AfterViewChecked, Component, OnInit, OnDestroy } from '@angular/core';

import { HighlightService } from '../../services/highlight-service.service';
import { ScrollService } from '../../services/scroll.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Post } from '../../interfaces/post.interface';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/cockpit/posts.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit, AfterViewChecked, OnDestroy {

  posts: Post[] = [];
  highlighted = false;
  postsSubscribe: Subscription = new Subscription();

  page = 1;
  totalPosts: number;
  loading = false;
  postPerPages = environment.posts.postsPerPage;

  constructor(
    private highlightService: HighlightService,
    private scrollService: ScrollService,
    private postsService: PostsService
  ) { }

  public ngOnInit() {
    this.postsSubscribe = this.postsService.getPosts({ content: false })
    .subscribe( (posts: Post[]) => {
      this.posts.push(...posts);
    });

    this.postsService.getNumPosts()
    .subscribe( num => this.totalPosts = num);

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
