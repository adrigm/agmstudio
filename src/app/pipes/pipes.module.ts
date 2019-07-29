import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSafePipe } from './dom-safe.pipe';
import { TagsPipe } from './tags.pipe';



@NgModule({
  declarations: [
    DomSafePipe,
    TagsPipe
  ],
  imports: [],
  exports: [
    DomSafePipe,
    TagsPipe
  ]
})
export class PipesModule { }
