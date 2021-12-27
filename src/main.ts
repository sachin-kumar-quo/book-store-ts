import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const confifService = app.get<ConfigService>(ConfigService);
  const port = confifService.get('PORT');
  app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
