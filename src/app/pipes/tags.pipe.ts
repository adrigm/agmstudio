import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../interfaces/tag.interface';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {

  transform(tags: Tag[]): string {
    let result = '';

    for (const tag of tags) {
      result += tag.name.toUpperCase();
      result += ', ';
    }

    return result.slice(0, -2);
  }

}
