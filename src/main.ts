import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { TransformationInterceptor } from './core/interceptor';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './modules/auths/guard/jwt-auth.guard';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // config service
  const configService = app.get(ConfigService);

  // config port
  const port = configService.get('PORT');

  // config static files
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // config view engine
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  // config validate
  app.useGlobalPipes(new ValidationPipe());
  // config interceptor response data
  app.useGlobalInterceptors(new TransformationInterceptor());
  // config authentication guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  // config cookies
  app.use(cookieParser());
  // config cors
  app.use(
    cors({
      origin: true, // Cho phép các yêu cầu từ origin này
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức HTTP
      allowedHeaders: ['Content-Type', 'Authorization', 'folder_type'], // Cho phép các headers được gửi đi
      credentials: true, // Bật hỗ trợ cho các request có chứa cookies hoặc credentials
    }),
  );
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(port);
}
bootstrap();
