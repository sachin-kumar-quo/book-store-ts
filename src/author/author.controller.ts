import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Author, AuthorDocument } from './author.schema';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(): Promise<AuthorDocument[]> {
    return this.authorService.findAll();
  }

  @Get('/:id')
  getAuthor(@Param('id') id: string): Promise<AuthorDocument> {
    return this.authorService.findOne(id);
  }

  @Post()
  createAuthor(@Body() body: Author): Promise<AuthorDocument> {
    return this.authorService.create(body);
  }

  @Put('/:id')
  updateAuthor(
    @Param('id') id: string,
    @Body() body: Author,
  ): Promise<AuthorDocument> {
    return this.authorService.update(id, body);
  }

  @Delete('/:id')
  deleteAuthor(@Param('id') id: string): Promise<AuthorDocument> {
    return this.authorService.delete(id);
  }
}
