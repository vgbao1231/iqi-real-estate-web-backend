import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'tsconfig-paths/register';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // hoặc '*' để cho tất cả domain
    credentials: true, // cho phép gửi cookie (refresh token)
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
