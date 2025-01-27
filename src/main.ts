import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO e impedi criação de campos não definidos
      forbidNonWhitelisted: true, // Exibe erro caso tente criar um campo não definido
      transform: true, // Transforma os tipos de dados do param e DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();
