import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './features/signup/signup.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SwaggerConfig } from './configs/swagger.config';
import { LoginModule } from './features/login/login.module';
import { SharedModule } from './core/shared.module';
import { ResetPasswordModule } from './features/reset-password/reset-password.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileModule } from './features/profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject: [ConfigService],
    }),
    SignupModule,
    LoginModule,
    SharedModule,
    ResetPasswordModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, SwaggerConfig],
})
export class AppModule {}
