import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGaurd } from '../gaurds/auth.gaurd';
import { Book } from './book.schema';
import { BookService } from './book.service';
import { CreateBookDto, QueryOptions } from './dto/index.dto';

@Controller('book')
@UseGuards(AuthGaurd)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@Query() query) {
    const { limit = 10, page = 1, sort = '_id', order = 1 } = query;
    const options: QueryOptions = {
      limit: Number(limit),
      offset: Number(page - 1) * Number(limit),
      sort: sort,
      order: Number(order),
      text: query.text,
    };
    return this.bookService.findAll(options);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.bookService.create(body);
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() body) {
    return this.bookService.update(id, body);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
