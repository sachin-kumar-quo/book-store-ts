import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestbookstore'),
  ],
  controllers: [],
})
export class AppModule {}
