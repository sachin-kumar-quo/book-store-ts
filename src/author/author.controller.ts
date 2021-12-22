import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { QueryOptions } from 'mongoose';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(@Query() query): Promise<Author[]> {
    const { limit = 10, page = 1, sort = '_id', order = 1 } = query;
    const options: QueryOptions = {
      limit: Number(limit),
      offset: Number(page - 1) * Number(limit),
      sort: sort,
      order: Number(order),
      text: query.text,
    };
    return this.authorService.findAll(options);
  }

  @Get('/:id')
  getAuthor(@Param('id') id: number): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Post()
  createAuthor(@Body() body: Author): Promise<Author> {
    return this.authorService.create(body);
  }

  @Put('/:id')
  updateAuthor(@Param('id') id: number, @Body() body: Author): Promise<Author> {
    return this.authorService.update(id, body);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id') id: number) {
    return this.authorService.delete(id);
  }
}
