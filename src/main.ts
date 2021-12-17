import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const confifService = app.get<ConfigService>(ConfigService);
  const port = confifService.get('PORT');
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
