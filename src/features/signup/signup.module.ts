import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from 'src/features/signup/signup.schema';
import { SharedModule } from 'src/core/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signup.name, schema: SignupSchema }]),
    SharedModule,
  ],
  controllers: [SignupController],
  providers: [SignupService],
  exports: [SignupService],
})
export class SignupModule {}
