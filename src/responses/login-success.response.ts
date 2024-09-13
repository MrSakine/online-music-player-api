import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './base.response';

export class LoginSuccessResponse extends BaseResponse {
  @ApiProperty()
  accessToken: string;
}
