import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés qui ne sont pas dans le DTO
      forbidNonWhitelisted: true, // Erreur si une propriété non listée est fournie
      transform: true, // Transforme automatiquement les types (ex: string -> number)
    }),
  );
  app.enableCors();

  logger.log(
    `PLAYER_INFO_CACHE_ENABLED = ${configService.get<string>('PLAYER_INFO_CACHE_ENABLED')}`,
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
