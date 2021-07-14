import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function startServer() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () =>
    console.log(`Server running on http://localhost:${PORT}/graphql...`),
  );
}
startServer();
