import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Proyecto Integrador M4-Back Eduardo Ruiz')
    .setDescription('Aplicacion Back-End creada con NestJS, TypeScript, TypeORM y PostgreSQL')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(LoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
