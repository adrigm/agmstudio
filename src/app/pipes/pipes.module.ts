import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSafePipe } from './dom-safe.pipe';
import { TagsPipe } from './tags.pipe';
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [
    DomSafePipe,
    TagsPipe,
    ImagePipe
  ],
  imports: [],
  exports: [
    DomSafePipe,
    TagsPipe,
    ImagePipe
  ]
})
export class PipesModule { }
