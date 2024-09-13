import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { SignupDTO } from 'src/dtos/signup.dto';
import { BaseResponse } from 'src/responses/base.response';
import { SignupService } from './signup.service';
import { ResponseUtils } from 'src/utils/response.utils';

@Controller('signup')
export class SignupController {
  createdUser: string = 'A new user has been created successfully';
  emailExist: string = 'Email already exists';

  constructor(
    private readonly signupService: SignupService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @ApiCreatedResponse({
    description: 'A new user has been created successfully',
    type: BaseResponse,
  })
  @ApiBadRequestResponse({
    description: 'Email already exists',
    type: BaseResponse,
  })
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() signup: SignupDTO): Promise<BaseResponse> {
    const exist = await this.signupService.findByMail(signup.mail);
    if (exist) {
      throw new HttpException(this.emailExist, HttpStatus.CONFLICT);
    }
    await this.signupService.create(signup);
    return this.responseUtils.simpleResponse(this.createdUser);
  }
}
