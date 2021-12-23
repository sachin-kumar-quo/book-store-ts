import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Like, Repository } from 'typeorm';

import { Book } from './book.entity';
import { QueryOptions } from './dto/index.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookModel: Repository<Book>,
    @InjectRepository(Author) private authorModel: Repository<Author>,
  ) {}
  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findOne(id);
  }
  async findAll(options: QueryOptions): Promise<Book[]> {
    if (options.text) {
      return await this.bookModel.find({
        where: { title: Like(`%${options.text}%`) },
        take: options.limit,
        skip: options.offset,
      });
    }
    return await this.bookModel.find({
      take: options.limit,
      skip: options.offset,
    });
  }

  async create(book: Book): Promise<Book> {
    const authorId = book.author;
    const author = await this.authorModel.findOne(Number(authorId));
    book.author = author;
    const newBook = this.bookModel.create(book);
    return await this.bookModel.save(newBook);
  }
  async update(id: string, updatedbBook: Book): Promise<Book> {
    return await this.bookModel.save({ id, ...updatedbBook });
  }
  async delete(id: string) {
    return await this.bookModel.delete(id);
  }
}
