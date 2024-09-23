import { Injectable } from '@nestjs/common';
import { BaseDataArrayResponse } from 'src/responses/base-data-array.response';
import { BaseDataResponse } from 'src/responses/base-data.response';
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

  dataResponse(message: string, data: any) {
    const res = new BaseDataResponse();
    res.message = message;
    res.data = data;
    return res;
  }

  dataArrayResponse(message: string, data: Array<any>) {
    const res = new BaseDataArrayResponse();
    res.message = message;
    res.data = data;
    return res;
  }
}
