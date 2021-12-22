import { Author } from 'src/author/author.schema';

export class CreateBookDto {
  id: number;
  title: string;
  publisher: string;
  published: Date;
  author: Author;
}

export class updateBookDto {
  id: number;
  title: string;
  publisher: string;
  published: Date;
  author: Author;
}
export class QueryOptions {
  offset?: number;
  limit?: number;
  fields?: string;
  text?: string;
  sort?: string;
  order?: number;
}
