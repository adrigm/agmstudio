import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() hideSidebar = false;
  firstLoad = true;

  menuItems = [
    {
      name: 'Inicio',
      icon: 'zmdi zmdi-home',
      route: '/inicio'
    },
    {
      name: 'Blog',
      icon: 'zmdi zmdi-edit',
      route: '/blog'
    },
    {
      name: 'Portafolio',
      icon: 'zmdi zmdi-desktop-mac',
      route: '/portafolio'
    },
    {
      name: 'Libros',
      icon: 'zmdi zmdi-book',
      route: '/libros'
    },
    {
      name: 'Sobre mí',
      icon: 'zmdi zmdi-account',
      route: '/sobre-mi'
    },
    {
      name: 'Contacto',
      icon: 'zmdi zmdi-email',
      route: '/contacto'
    }
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.firstLoad = false;
    }, 500);
  }



}
