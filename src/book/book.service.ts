import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from './book.schema';
import { QueryOptions } from './dto/index.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
  async findOne(id: string): Promise<BookDocument> {
    return await this.bookModel.findById(id);
  }
  async findAll(options: QueryOptions): Promise<BookDocument[]> {
    if (options.text) {
      console.log('options.text', options.text);
      return await this.bookModel
        .find({
          $text: { $search: options.text },
        })
        .skip(options.offset)
        .limit(options.limit);
    }
    return await this.bookModel
      .find()
      .skip(options.offset)
      .limit(options.limit);
  }

  async create(book: Book): Promise<BookDocument> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }
  async update(id: string, book: Book): Promise<BookDocument> {
    return await this.bookModel.findByIdAndUpdate(id, book);
  }
  async delete(id: string): Promise<BookDocument> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
