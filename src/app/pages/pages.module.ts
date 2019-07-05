import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { BooksComponent } from './books/books.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [HomeComponent, BlogComponent, AboutComponent, BooksComponent, PortfolioComponent, ContactComponent, PostComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
