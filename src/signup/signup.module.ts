import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from 'src/signup/signup.schema';
import { ResponseUtils } from 'src/utils/response.utils';
import { HashingUtils } from 'src/utils/hashing.utils';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signup.name, schema: SignupSchema }]),
  ],
  controllers: [SignupController],
  providers: [SignupService, ResponseUtils, HashingUtils],
})
export class SignupModule {}
