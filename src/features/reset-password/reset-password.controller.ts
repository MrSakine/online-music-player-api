import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { ResetPasswordDTO } from 'src/dtos/reset-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/responses/base.response';
import { ResponseUtils } from 'src/utils/response.utils';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(
    private readonly resetPasswordService: ResetPasswordService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @ApiOkResponse({
    description: 'Password has been reset successfully',
    type: BaseResponse,
  })
  @ApiNotFoundResponse({
    description: 'Email not found',
    type: BaseResponse,
  })
  @Put('')
  async reset(
    @Query('mail') mail: string,
    @Body() resetPassword: ResetPasswordDTO,
  ) {
    try {
      await this.resetPasswordService.reset(mail, resetPassword);
      return this.responseUtils.simpleResponse(
        'Password has been reset successfully',
      );
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
