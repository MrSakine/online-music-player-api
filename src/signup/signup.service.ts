import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDTO } from 'src/dtos/signup.dto';
import { Signup } from 'src/signup/signup.schema';
import { Model } from 'mongoose';
import { HashingUtils } from 'src/utils/hashing.utils';

@Injectable()
export class SignupService {
  constructor(
    @InjectModel(Signup.name) private signupModel: Model<Signup>,
    private readonly hashingUtils: HashingUtils,
  ) {}

  async create(signup: SignupDTO): Promise<void> {
    signup.password = await this.hashingUtils.hash(signup.password);
    const newUser = new this.signupModel(signup);
    newUser.save();
  }

  async findByMail(mail: string): Promise<Signup> {
    return this.signupModel.findOne({ mail: mail }).exec();
  }
}
