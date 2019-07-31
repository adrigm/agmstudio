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
export class BlogComponent implements OnInit, OnDestroy {
  post: Observable<Post> = null;
  type: string;
  slug: string;

  constructor(
    private router: ActivatedRoute,
    private postsService: PostsService
  ) { }

  public ngOnInit() {
    this.getPostsList();
  }

  private getPostsList() {
    this.router.params
    .subscribe( params => {
      const type = params['type'] || '';
      const id = params['id'] || '';

      this.type = type;
      this.slug = id;

      if (type === 'post') {
        this.post = this.postsService.getPostByUniqueSlug(this.slug);
      }
    });
  }

  public ngOnDestroy(): void {
  }
}
