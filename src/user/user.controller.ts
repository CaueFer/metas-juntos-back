import { Controller, Get } from '@nestjs/common';
import { UserDTO } from 'src/models/user/dtos/user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return this._userService.getAllUser();
  }
}
