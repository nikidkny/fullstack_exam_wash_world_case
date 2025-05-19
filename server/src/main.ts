import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'stream/consumers';
import { urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
    // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
