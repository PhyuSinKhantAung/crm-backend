import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './exception-filters/allExceptions.filter';
import { ConfigService } from '@nestjs/config';
import { seedDatabase } from 'prisma/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const config = app.get(ConfigService);

  await seedDatabase();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, config));

  await app.listen(3000);
}
bootstrap();
