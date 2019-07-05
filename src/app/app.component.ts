import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BreakpointObserver,  } from '@angular/cdk/layout';
import { Subject } from 'rxjs';

declare var OverlayScrollbars;

export type BreakpointType = 'xs' | 'sm' |  'md' | 'lg' | 'xl';

export const BreakpointsMedia = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 991px)',
  lg: '(min-width: 992px) and (max-width: 1199px)',
  xl: '(min-width: 1200px)'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ob: any[] | any;
  smallDevice: boolean;
  showSidebar: boolean;

  private unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.setScroll();
    this.changeRouter();
    this.setBreakPoint();

  }

  private setBreakPoint() {
    for (const breakPoint in BreakpointsMedia) {
      if (breakPoint) {
        this.breakpointObserver.observe([BreakpointsMedia[breakPoint]])
        .pipe(
          takeUntil(this.unsubscribeAll),
          filter(resp => resp.matches === true),
          map(resp => resp.breakpoints)
        )
        .subscribe( () => {
          const breakpoint: BreakpointType = breakPoint as BreakpointType;
          if (breakpoint === 'xl' || breakpoint === 'lg') {
            this.showSidebar = true;
            this.smallDevice = false;
          } else {
            this.showSidebar = false;
            this.smallDevice = true;
          }
        });
      }
    }
  }

  setScroll() {
    this.ob = OverlayScrollbars(document.querySelectorAll('.st-scroll'), {
      // className       : 'os-theme-thin-dark',
      resize          : 'none',
      sizeAutoCapable : false,
      // paddingAbsolute : true,
      // autoUpdate      : true,
      scrollbars : {
          autoHide: 'leave',
          autoHideDelay: 100
      },
      overflowBehavior: {
        x: 'h'
      },
      callbacks: {
        onScroll: () => {
          // this.scroll = this.ob.scroll().position.y;
        }
      }
    });
  }

  changeRouter() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map( (route: NavigationEnd) => route.urlAfterRedirects)
    ).subscribe(url => {
      if (Array.isArray(this.ob)) {
        this.ob.map(op => {
          op.scroll({ y : '0px'  });
          this.showSidebar = false;
        });
      } else {
        this.ob.scroll({ y : '0px'  });
        this.showSidebar = false;
      }
    });
  }
}
