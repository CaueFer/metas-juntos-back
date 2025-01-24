import { Body, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/models/user/dtos/createUser.dto';
import { UserDTO } from 'src/models/user/dtos/user.dto';
import { mockUsers } from 'src/models/user/mock/user.mock';

@Injectable()
export class UserService {

  async getAllUser(): Promise<UserDTO[]> {
    return mockUsers;
  }

  async createUser(user: CreateUserDTO): Promise<CreateUserDTO> {
    return user;
  }
}
