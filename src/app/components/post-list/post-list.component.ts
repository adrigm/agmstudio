import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/cockpit/posts.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() type;
  @Input() slug;

  public posts: Post[] = [];
  public totalPosts: number;
  public loading = false;
  public postPerPage = new Array(environment.posts.postsPerPage);

  private page = 0;

  constructor(
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.loadPosts();

    this.postsService.getNumPosts()
    .subscribe( num => this.totalPosts = num);
  }

  public loadPosts() {
    this.loading = true;
    let obs: Observable<Post[]>;

    switch (this.type) {
      case 'category':
        obs = this.postsService.getPostsByCategorySlug( this.slug, { page: this.page } );
        break;
      case 'tag':
        obs = this.postsService.getPostsByTagSlug( this.slug, { page: this.page } );
        break;
      default:
        obs = this.postsService.getPosts( { page: this.page } );
    }

    this.getPosts(obs);
  }

  private getPosts(obs: Observable<Post[]>) {
    obs.subscribe( posts => {
      this.posts.push(...posts);
      this.loading = false;
      this.page++;
    });
  }

  public goPost(slug: string) {
    this.router.navigate(['/', 'blog', 'post', slug]);
  }

}
