import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from 'src/models/user/dtos/user.dto';
import { UserService } from './user.service';
import { CreateUserDTO } from 'src/models/user/dtos/createUser.dto';

@Controller('/user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return this._userService.getAllUser();
  }

  @Post()
  async createUser(@Body() newUser: CreateUserDTO) {
    console.log(newUser)
    return this._userService.createUser(newUser);
  }
}
