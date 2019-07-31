import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { PagesService } from '../../services/cockpit/pages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../interfaces/page-interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HighlightService } from '../../services/highlight-service.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewChecked {
  public page: Page;
  private highlighted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pagesService: PagesService,
    private highlightService: HighlightService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  public getPage() {
    this.activatedRoute.params
    .subscribe( params => {
      const slug = params['id'] || '';

      this.pagesService.getPageBySlug(slug)
      .pipe(
        tap(page => !page ? this.router.navigate(['/']) : null)
      )
      .subscribe( page => {
        this.page = page;
      });

    });
  }

  public ngAfterViewChecked(): void {
    if (this.page && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

}
