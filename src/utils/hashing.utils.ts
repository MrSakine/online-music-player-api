import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingUtils {
  saltRounds = 10;

  async genSalt() {
    return bcrypt.genSalt(this.saltRounds);
  }

  async hash(value: string) {
    const salt = await this.genSalt();
    const hashedPassword = await bcrypt.hash(value, salt);
    return hashedPassword;
  }

  static async compare(hashedValue: string, value: string) {
    const res = await bcrypt.compare(value, hashedValue);
    return res;
  }
}
