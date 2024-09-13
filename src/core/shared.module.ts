import { Module } from '@nestjs/common';
import { HashingUtils } from '../utils/hashing.utils';
import { ResponseUtils } from '../utils/response.utils';

@Module({
  providers: [HashingUtils, ResponseUtils],
  exports: [HashingUtils, ResponseUtils],
})
export class SharedModule {}
