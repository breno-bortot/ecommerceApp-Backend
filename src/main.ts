import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser());
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  
  app.useGlobalFilters(new HttpExceptionFilter())

  const config = new DocumentBuilder()
  .setTitle('EcommerceApp-API')
  .setDescription('Simple E-commerce api for studie purposes with: authentication and auhtorization using JWT token, Shopping Cart, checkout fulfilled with a Customer Order created')
  .setVersion('1.0')
  .addCookieAuth('USER_TOKEN')
  .addTag('EcommerceApp')
  .build();
   
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  
  await app.listen(5000);
}
bootstrap();
 