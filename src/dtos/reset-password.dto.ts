import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({ required: true })
  @MinLength(6)
  password: string;
}
