import { Pipe, PipeTransform, OnDestroy, Injector, ChangeDetectorRef } from '@angular/core';
import { ImageService } from '../services/cockpit/image.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'image',
  pure: false
})
export class ImagePipe implements PipeTransform, OnDestroy {
  private asyncPipe: AsyncPipe;

  constructor(
    private imageService: ImageService,
    private injector: Injector
  ) {
    // tslint:disable-next-line: deprecation
    this.asyncPipe = new AsyncPipe(injector.get(ChangeDetectorRef));
  }

  transform(value: string, width = 100, height = 100): string {

    // const url = this.imageService.getImageUrl(value, width, height);

    // return environment.cockpit.urlStorage + (this.asyncPipe.transform(url) || '');

    return environment.cockpit.urlStorage + '/uploads' + value;
  }

  ngOnDestroy() {
    this.asyncPipe.ngOnDestroy();
 }

}
