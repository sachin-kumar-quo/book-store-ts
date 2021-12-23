import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryOptions } from 'src/book/dto/index.dto';
import { Author, AuthorDocument } from './author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author') private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async findAll(options: QueryOptions): Promise<AuthorDocument[]> {
    if (options.text) {
      console.log('options.text', options.text);
      return await this.authorModel.find({
        $text: { $search: options.text },
      });
      // .skip(options.offset)    // for testing only
      // .limit(options.limit);
    }
    return await this.authorModel.find();
    // .skip(options.offset)   // for testing only
    // .limit(options.limit);
  }

  async findOne(id: string): Promise<AuthorDocument> {
    return await this.authorModel.findById(id);
  }

  async create(author: Author): Promise<AuthorDocument> {
    return await new this.authorModel(author).save();
  }

  async update(id: string, author: Author): Promise<AuthorDocument> {
    return await this.authorModel.findByIdAndUpdate(id, author, { new: true });
  }

  async delete(id: string): Promise<AuthorDocument> {
    return await this.authorModel.findByIdAndRemove(id);
  }
}
