import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @Get()
  getAuthors() {
    return this.authorService.findAll();
  }
  @Get('/:id')
  getAuthor(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Post()
  createAuthor(@Body() body) {
    return this.authorService.create(body);
  }

  @Put('/:id')
  updateAuthor(@Param('id') id: string, @Body() body) {
    return this.authorService.update(id, body);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorService.delete(id);
  }
}
