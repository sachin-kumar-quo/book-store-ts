import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { AuthorModule } from 'src/author/author.module';
import { AuthorService } from 'src/author/author.service';
import { IsLoggedInMiddleware } from 'src/middlewares/login.middleware';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  imports: [
    AuthorModule,
    TypeOrmModule.forFeature([Book, Author]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BookController],
  providers: [AuthorService, BookService],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsLoggedInMiddleware)
      .forRoutes({ path: 'book', method: RequestMethod.GET });
  }
}
