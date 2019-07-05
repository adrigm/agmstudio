import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { CockpitService } from 'src/app/services/cockpit.service';

import { HighlightService } from '../../services/highlight-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, AfterViewChecked {

  posts: any;
  highlighted = false;

  constructor(
    private highlightService: HighlightService,
    private cockpit: CockpitService
  ) { }

  public ngOnInit() {
    this.cockpit.getAllPosts()
    .subscribe( posts => {
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

}
