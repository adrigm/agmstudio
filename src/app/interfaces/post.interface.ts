import { Category } from './category.interface';
import { Tag } from './tag.interface';
import { File } from './file.interface';

export interface Post {
  categories: Category[];
  content: string;
  image: File;
  published: boolean;
  tags: Tag[];
  title: string;
  title_slug: string;
  _by: string;
  _created: number;
  _id: string;
  _mby: string;
  _modified: number;
}
