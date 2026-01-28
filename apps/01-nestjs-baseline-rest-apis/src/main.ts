import dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './docs/swagger';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createDocument(app);
  app.useGlobalFilters(new ExceptionsHandler());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
