import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import 'tsconfig-paths/register';
import { AppModule } from './app.module';

const allowedOrigins = [
  'https://iqi-real-estate-web.vercel.app', // Frontend chính (Production Vercel)
  'http://localhost:3000', // Môi trường local development (ví dụ: React chạy ở cổng 3000)
  // More....
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: allowedOrigins, // hoặc '*' để cho tất cả domain
    credentials: true, // cho phép gửi cookie (refresh token)
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
