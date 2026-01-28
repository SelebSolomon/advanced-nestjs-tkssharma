import dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './docs/swagger';
// import { HttpExceptionFilter } from './app/core/filter/exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createDocument(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
