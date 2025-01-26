import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDTO,
} from 'src/models/user/dtos/createUser.dto';
import { Response } from 'express';

@Controller('/user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    return this._userService.getAllUsers(res);
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDTO, @Res() res: Response) {
    return this._userService.createUser(newUser, res);
  }
}
