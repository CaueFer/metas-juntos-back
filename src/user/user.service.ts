import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/models/user/dtos/user.dto';
import { mockUsers } from 'src/models/user/mock/user.mock';

@Injectable()
export class UserService {
  getAllUser(): UserDTO[] {
    return mockUsers;
  }
}
