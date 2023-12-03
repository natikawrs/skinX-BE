import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('SkinX Project')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    // .addSecurity('Bearer', {
    //   type: 'apiKey',
    //   in: 'header',
    //   name: 'Authorization',
    //   description:
    //     'API key for local development (e.g., {"userId": "7e3603c6-041c-405b-b280-1d35587583bb"})',
    // })
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'bearer',
    //   in: 'header',
    // })
    .addTag('skinX')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const restfulPort = 4000;
  await app.listen(restfulPort);
  console.log(
    `Nest application is running on: http://localhost:${restfulPort}`,
  );
}
bootstrap();
