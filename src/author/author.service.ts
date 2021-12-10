import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorDocument } from './author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author') private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async findAll(): Promise<AuthorDocument[]> {
    return await this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<AuthorDocument> {
    return await this.authorModel.findById(id).exec();
  }

  async create(author: AuthorDocument): Promise<AuthorDocument> {
    return await new this.authorModel(author).save();
  }

  async update(id: string, author: AuthorDocument): Promise<AuthorDocument> {
    return await this.authorModel
      .findByIdAndUpdate(id, author, { new: true })
      .exec();
  }

  async delete(id: string): Promise<AuthorDocument> {
    return await this.authorModel.findByIdAndRemove(id).exec();
  }
}
