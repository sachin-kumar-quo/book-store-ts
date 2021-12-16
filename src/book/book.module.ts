import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { IsLoggedInMiddleware } from 'src/middlewares/login.middleware';
import { BookController } from './book.controller';
import { BookSchema } from './book.schema';
import { BookService } from './book.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
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
