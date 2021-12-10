import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Book } from './book.schema';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/index.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.findAll();
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
