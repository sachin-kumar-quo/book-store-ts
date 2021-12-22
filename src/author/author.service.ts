import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryOptions } from 'src/book/dto/index.dto';
import { Repository, Like } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorModel: Repository<Author>,
  ) {}

  async findAll(options: QueryOptions): Promise<Author[]> {
    if (options.text) {
      return await this.authorModel.find({
        where: { title: Like(`%${options.text}%`) },
        take: options.limit,
        skip: options.offset,
      });
    }
    return await this.authorModel.find({
      take: options.limit,
      skip: options.offset,
    });
  }

  async findOne(id: number): Promise<Author> {
    return await this.authorModel.findOne(id);
  }

  async create(author: Author): Promise<Author> {
    const newAuthor = this.authorModel.create(author);
    return await this.authorModel.save(newAuthor);
  }

  async update(id: number, author: Author): Promise<Author> {
    return await this.authorModel.save({ id, ...author });
  }

  async delete(id: number) {
    return await this.authorModel.delete(id);
  }
}
