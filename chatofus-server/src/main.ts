import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés qui ne sont pas dans le DTO
      forbidNonWhitelisted: true, // Erreur si une propriété non listée est fournie
      transform: true, // Transforme automatiquement les types (ex: string -> number)
    }),
  );
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
