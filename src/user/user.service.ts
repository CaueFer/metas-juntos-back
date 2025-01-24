import { Body, Injectable } from '@nestjs/common';
import {
  CreateUserDTO,
  CreateUserDTOType,
} from 'src/models/user/dtos/createUser.dto';
import { UserDTO } from 'src/models/user/dtos/user.dto';
import { mockUsers } from 'src/models/user/mock/user.mock';
import { Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getAllUsers(res: Response): Promise<Response> {
    try {
      const users = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error) {
      console.log('Error Getting All Users', error);

      return res.status(500).json({
        message: 'Error Getting All Users',
        error: error,
      });
    }
  }

  async createUser(user: CreateUserDTOType, res: Response): Promise<Response> {
    try {
      const existUser = await prisma.user.findFirst({
        where: {
          email: user?.userEmail,
        },
      });

      if (existUser)
        return res.status(400).json({
          message: 'User Email Already Exist',
        });

      const response = await prisma.user.create({
        data: {
          name: user.userName,
          email: user.userEmail,
        },
      });

      return res.status(201).json({
        message: 'User Created Successfully',
        userId: response.id,
      });
    } catch (error) {
      console.error('Error creating user:', error);

      return res.status(500).json({
        message: 'Error Creating User',
        error: error,
      });
    }
  }
}
