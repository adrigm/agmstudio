import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { PagesService } from '../../services/cockpit/pages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../interfaces/page-interface';
import { Observable, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';
import { HighlightService } from '../../services/highlight-service.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, AfterViewChecked, OnDestroy {
  public page: Page;
  private highlighted = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

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
    .pipe(
      map( params => params['id'] || '' ),
      switchMap( slug => {
        return this.pagesService.getPageBySlug(slug);
      })
    )
    .pipe(
      tap(page => !page ? this.router.navigate(['/']) : null ),
      takeUntil(this.destroy$),
    )
    .subscribe( page => {
      this.page = page;
    });
  }

  public ngAfterViewChecked(): void {
    if (this.page && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
