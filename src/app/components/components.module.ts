import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from '../pipes/pipes.module';
import { PostListComponent } from './post-list/post-list.component';



@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    PostListComponent
  ]
})
export class ComponentsModule { }
