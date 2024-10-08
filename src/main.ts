import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configs/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { MusicFilesUtils } from './utils/music-file.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  const swaggerConfig = app.get(SwaggerConfig);
  const configService = app.get(ConfigService);
  const musicFilesUtils = app.get(MusicFilesUtils);

  await musicFilesUtils.load('./assets/musics.json');

  const port = configService.get<number>('PORT', 3000);
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, swaggerConfig.instance());
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  await app.listen(port);
  console.log(`App started => http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
