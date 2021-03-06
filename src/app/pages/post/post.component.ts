import { Component, OnInit, AfterViewChecked, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/cockpit/posts.service';
import { Post } from '../../interfaces/post.interface';
import { map, switchMap, tap, takeUntil } from 'rxjs/operators';
import { HighlightService } from '../../services/highlight-service.service';
import { Subject, Observable } from 'rxjs';
import { UserService } from '../../services/cockpit/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, AfterViewChecked, OnDestroy {
  public post: Post;
  public userName$: Observable<User>;

  private highlighted = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private userService: UserService,
    private highlightService: HighlightService
  ) { }

  ngOnInit() {
    this.getPost();
  }

  public getPost() {
    this.activatedRoute.params
    .pipe(
      map( params => params['id'] || '' ),
      switchMap( slug => {
        return this.postsService.getPostByUniqueSlug(slug);
      })
    )
    .pipe(
      tap(post => !post ? this.router.navigate(['/blog']) : null ),
      takeUntil(this.destroy$)
    )
    .subscribe( post => {
      this.post = post;
      this.getUserName(post._by);
    });
  }

  private getUserName(id: string) {
    this.userName$ = this.userService.getUserById(id);
  }

  public ngAfterViewChecked(): void {
    if (this.post && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
