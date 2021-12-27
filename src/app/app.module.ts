import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthorModule } from 'src/author/author.module';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module';
import configuration from 'src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    BookModule,
    AuthorModule,
    UserModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [],
})
export class AppModule {}
