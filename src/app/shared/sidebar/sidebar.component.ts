import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/cockpit/category.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../../interfaces/tag.interface';
import { TagsService } from '../../services/cockpit/tags.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() hideSidebar = false;
  @Input() url: string;

  public categories$: Observable<Category[]>;
  public tags$: Observable<Tag[]>;

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

  constructor(
    private categoryService: CategoryService,
    private tagsService: TagsService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories()
    .pipe(
      take(1)
    );

    this.tags$ = this.tagsService.getTags()
    .pipe(
      take(1)
    );
  }

}
