import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
import { SharedModule } from 'src/core/shared.module';
import { SignupModule } from '../signup/signup.module';

@Module({
  imports: [SharedModule, SignupModule],
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
})
export class ResetPasswordModule {}
