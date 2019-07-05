import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() sidebarOpen: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openSidebar() {
    this.sidebarOpen.emit(true);
  }

}
