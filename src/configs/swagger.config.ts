import { Injectable } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class SwaggerConfig {
  instance() {
    return new DocumentBuilder()
      .setTitle('Online music  API')
      .setDescription('API description')
      .setVersion('1.0')
      .build();
  }
}
