import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import {  join } from 'path';

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true //forzar validacion
  }))
  app.useStaticAssets(join(__dirname, '../public'))// statics images
  await app.listen(port);
}
bootstrap();




// dep. validation: npm i class-validator class-transformer