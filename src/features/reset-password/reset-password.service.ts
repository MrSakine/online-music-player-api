import { Injectable } from '@nestjs/common';
import { SignupService } from '../signup/signup.service';
import { ResetPasswordDTO } from 'src/dtos/reset-password.dto';
import { HashingUtils } from 'src/utils/hashing.utils';

@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly signupService: SignupService,
    private readonly hashingUtils: HashingUtils,
  ) {}

  async reset(mail: string, data: ResetPasswordDTO) {
    const emailExist = await this.signupService.findByMail(mail);
    if (!emailExist) throw new Error('Email not found');

    emailExist.password = await this.hashingUtils.hash(data.password);
    return await this.signupService.updateData(emailExist);
  }
}
