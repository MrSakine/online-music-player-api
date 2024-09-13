import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/responses/base.response';

@Injectable()
export class ResponseUtils {
  simpleResponse(message: string) {
    const res = new BaseResponse();
    res.message = message;
    return res;
  }
}
