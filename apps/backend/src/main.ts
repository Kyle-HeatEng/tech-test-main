import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { BreedModule } from './app/breed.module';
import { ValidationExceptionFilter } from './filters/validation-exception.fiter';

async function bootstrap() {
  const app = await NestFactory.create(BreedModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
