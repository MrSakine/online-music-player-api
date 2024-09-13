import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './login.schema';
import { SharedModule } from 'src/core/shared.module';
import { SignupModule } from '../signup/signup.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }]),
    SignupModule,
    SharedModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
