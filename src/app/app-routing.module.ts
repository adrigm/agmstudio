import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { BooksComponent } from './pages/books/books.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PostComponent } from './pages/post/post.component';
import { PageComponent } from './pages/page/page.component';

const routes: Routes = [
  { path: 'blog/:type/:id', component: BlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'portafolio', component: PortfolioComponent },
  { path: 'portafolio/:type/:id', component: PortfolioComponent },
  { path: 'contacto', component: ContactComponent },
  { path: ':id', component: PageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
