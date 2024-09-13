import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ required: true })
  @IsEmail()
  mail: string;

  @ApiProperty({ required: true })
  @MinLength(6)
  password: string;
}
