import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { SignupService } from '../signup/signup.service';
import { ResponseUtils } from 'src/utils/response.utils';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly signupService: SignupService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User profile has been retrieved successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  @Get('')
  async getProfile(@Request() req: any) {
    const user = await this.signupService.findByMail(req.user.username);
    const { fullname, mail } = user;

    return this.responseUtils.dataResponse('User info fetched successfully', {
      fullname,
      mail,
    });
  }
}
