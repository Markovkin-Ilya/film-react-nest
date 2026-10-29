import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './ErrorFilter';
import 'dotenv/config';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(new TskvLogger());
  await app.listen(3000);
}
bootstrap();
