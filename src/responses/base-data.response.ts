import { BaseResponse } from './base.response';

export class BaseDataResponse<T> extends BaseResponse {
  data: T;
}
