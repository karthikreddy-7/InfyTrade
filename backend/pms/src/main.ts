import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*', // You can specify allowed origins here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);

  // Create Swagger options
  const options = new DocumentBuilder()
    .setTitle('InfyTrade APIs Service')
    .setDescription('Apis for InfyTrade Application')
    .setVersion('1.0')
    .addTag('Trade')
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger UI
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
