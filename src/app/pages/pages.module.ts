import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { PageComponent } from './page/page.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    BlogComponent,
    PortfolioComponent,
    ContactComponent,
    PostComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ComponentsModule
  ]
})
export class PagesModule { }
