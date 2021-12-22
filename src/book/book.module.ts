import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsLoggedInMiddleware } from 'src/middlewares/login.middleware';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsLoggedInMiddleware)
      .forRoutes({ path: 'book', method: RequestMethod.GET });
  }
}
