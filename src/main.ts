import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware pentru cookie-uri
  app.use(cookieParser());

  // Activează CORS
  app.enableCors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['Set-Cookie'],
  });

  // Servirea folderului uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(5000, '0.0.0.0');
}
bootstrap();
