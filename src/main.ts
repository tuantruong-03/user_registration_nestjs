import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_DOMAIN, 
    ],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS' ],
    allowedHeaders: ['Content-Type', 'Authorization',],
  })
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
