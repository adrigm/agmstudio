import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/cockpit/category.service';
import { take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../../interfaces/tag.interface';
import { TagsService } from '../../services/cockpit/tags.service';
import { MenuItem } from 'src/app/interfaces/menu-item.interface';
import { MenuService } from '../../services/cockpit/menu.service';

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

  public menuItems$: Observable<MenuItem[]>;

  constructor(
    private categoryService: CategoryService,
    private tagsService: TagsService,
    private menuService: MenuService
  ) {
  }

  ngOnInit() {
    this.menuItems$ = this.menuService.getMenuItems()
    .pipe(
      take(1)
    );

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
