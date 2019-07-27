export interface Archive {
  path: string;
  title: string;
  mime: string;
  description: string;
  tags: string[];
  size: number;
  image: boolean;
  video: boolean;
  audio: boolean;
  archive: boolean;
  document: boolean;
  code: boolean;
  created: number;
  modified: number;
  _by: string;
  width: number;
  height: number;
  colors: string[];
  folder: string;
  _id: string;
}
