import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    BookModule,
    AuthorModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: 'mongodb+srv://sachin:sachin@cluster0.qzpqp.mongodb.net/nestbookstore?retryWrites=true&w=majority',
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
