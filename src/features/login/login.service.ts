import { Injectable } from '@nestjs/common';
import { SignupService } from '../signup/signup.service';
import { HashingUtils } from 'src/utils/hashing.utils';
import { LoginDTO } from 'src/dtos/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly signupService: SignupService,
    private readonly hashingUtils: HashingUtils,
  ) {}

  async checkCredentials(data: LoginDTO): Promise<Record<string, any>> {
    const emailExist = await this.signupService.findByMail(data.mail);
    if (!emailExist) return { exist: false, data: null };
    const validPassword = await this.hashingUtils.compare(
      emailExist.password,
      data.password,
    );

    if (!validPassword) return { exist: false, data: null };
    return { exist: true, data: emailExist };
  }
}
