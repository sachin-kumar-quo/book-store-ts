import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestbookstore'),
  ],
  controllers: [UserController],
})
export class AppModule {}
