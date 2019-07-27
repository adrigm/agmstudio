import { Category } from './category.interface';
import { Tag } from './tag.interface';
import { Archive } from './archive.interface';

export interface Post {
  categories: Category[];
  content: string;
  image: Archive;
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
