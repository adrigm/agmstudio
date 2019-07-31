import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageComponent } from './pages/page/page.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PostComponent } from './pages/post/post.component';

const routes: Routes = [
  { path: 'blog/post/:id', component: PostComponent },
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
