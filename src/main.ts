import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';

async function startServer(): Promise<void> {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/graphql...`),
  );
}
startServer();
