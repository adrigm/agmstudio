import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSafePipe } from './dom-safe.pipe';



@NgModule({
  declarations: [
    DomSafePipe
  ],
  imports: [],
  exports: [
    DomSafePipe
  ]
})
export class PipesModule { }
