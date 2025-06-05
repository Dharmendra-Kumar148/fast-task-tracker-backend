import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://fast-task-tracker-frontend-xx9j.vercel.app',], // update as needed
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();