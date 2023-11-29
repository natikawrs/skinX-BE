import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const restfulPort = 3000;
  await app.listen(restfulPort);
  console.log(
    `Nest application is running on: http://localhost:${restfulPort}`,
  );
}
bootstrap();
