import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDTO {
  @ApiProperty({ required: true })
  @IsEmail()
  mail: string;

  @ApiProperty({ required: true })
  @MinLength(6)
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  fullname: string;
}
