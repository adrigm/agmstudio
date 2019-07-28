import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { HighlightService } from '../../services/highlight-service.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostContentComponent implements OnInit, AfterViewChecked {
  @Input() public post: Post;

  private highlighted = false;

  constructor(
    private highlightService: HighlightService
  ) { }

  ngOnInit() {
  }

  public ngAfterViewChecked(): void {
    if (this.post && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

}
