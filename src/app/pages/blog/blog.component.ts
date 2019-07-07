import { AfterViewChecked, Component, OnInit, OnDestroy } from '@angular/core';
import { CockpitService } from 'src/app/services/cockpit.service';

import { HighlightService } from '../../services/highlight-service.service';
import { ScrollService } from '../../services/scroll.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { Post } from '../../interfaces/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogComponent implements OnInit, AfterViewChecked, OnDestroy {

  posts: Post[];
  highlighted = false;
  postsSubscribe: Subscription = new Subscription();

  constructor(
    private highlightService: HighlightService,
    private scrollService: ScrollService,
    private cockpit: CockpitService
  ) { }

  public ngOnInit() {
    this.postsSubscribe = this.cockpit.getAllPosts()
    .subscribe( (posts: Post[]) => {
      this.posts = posts;
      console.log(posts);
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
