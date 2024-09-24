import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { SignupService } from '../signup/signup.service';
import { SharedModule } from 'src/core/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Signup, SignupSchema } from '../signup/signup.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Signup.name, schema: SignupSchema }]),
    SharedModule,
  ],
  controllers: [ProfileController],
  providers: [SignupService],
})
export class ProfileModule {}
