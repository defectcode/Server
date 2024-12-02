import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000'], // Default pentru local
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  await app.listen(5000);
}
bootstrap();
