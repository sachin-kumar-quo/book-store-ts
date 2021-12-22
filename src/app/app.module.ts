import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import configuration from 'src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    BookModule,
    AuthorModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3406,
      username: 'root',
      password: 'mypassword',
      database: 'nestbookStore',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
})
export class AppModule {}
