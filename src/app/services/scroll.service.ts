import { Injectable } from '@angular/core';

declare var OverlayScrollbars;

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private ob: any[] | any;

  constructor() {
  }

  public get scrollElements() {
    if (!this.ob) {
      this.setScroll();
    }
    return this.ob;
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
}
