import { BaseResponse } from './base.response';

export class BaseDataArrayResponse<T> extends BaseResponse {
  data: Array<T>;
}
