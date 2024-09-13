import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/responses/base.response';
import { LoginSuccessResponse } from 'src/responses/login-success.response';

@Injectable()
export class ResponseUtils {
  simpleResponse(message: string) {
    const res = new BaseResponse();
    res.message = message;
    return res;
  }

  newLogin(message: string, token: string) {
    const res = new LoginSuccessResponse();
    res.message = message;
    res.accessToken = token;
    return res;
  }
}
