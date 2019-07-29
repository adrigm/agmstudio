import { NgModule } from '@angular/core';
import { PostContentComponent } from './post-content/post-content.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    PostContentComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    PostContentComponent,
    PostListComponent
  ]
})
export class ComponentsModule { }
