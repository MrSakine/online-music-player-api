import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/responses/base.response';
import { LoginDTO } from 'src/dtos/login.dto';
import { ResponseUtils } from 'src/utils/response.utils';
import { LoginSuccessResponse } from 'src/responses/login-success.response';
import { Signup } from '../signup/signup.schema';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly responseUtils: ResponseUtils,
    private readonly jwtService: JwtService,
  ) {}

  @ApiUnauthorizedResponse({
    description: 'Bad credentials',
    type: BaseResponse,
  })
  @ApiOkResponse({
    description: 'User has been logged-in successfully',
    type: LoginSuccessResponse,
  })
  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: LoginDTO) {
    const { exist, data } = await this.loginService.checkCredentials(login);
    if (!exist)
      throw new HttpException('Bad credentials', HttpStatus.UNAUTHORIZED);

    const user = data as Signup;
    const payload = { sub: user._id, username: user.mail };
    const accessToken = await this.jwtService.signAsync(payload);
    return this.responseUtils.newLogin(
      'User has been logged-in successfully',
      accessToken,
    );
  }
}
