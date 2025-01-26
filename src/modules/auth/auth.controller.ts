import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LogInUserDTO } from 'src/models/user/dtos/logInUser.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body('email') email: string, @Res() res: Response) {
    await this._authService.generateOtp(email, res);
  }

  @Post('verifyOTP')
  async verifyOtp(@Body() logInUser: LogInUserDTO, @Res() res: Response) {
    this._authService.verifyOtp(logInUser.userEmail, logInUser.userOTP, res);
  }
}
