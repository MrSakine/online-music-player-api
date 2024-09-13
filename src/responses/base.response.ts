import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse {
  @ApiProperty()
  status: string = 'success';
  @ApiProperty()
  message: string;
}
