import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { CreateUserDto } from '../../src/user/dtos/create-user.dto';
import { User } from './types';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const hashedPassword = await argon.hash(dto.password);

    const data = { ...dto, password: hashedPassword };

    await this.prisma.user.create({
      data,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async updateUserById(id: string, dto: UpdateUserDto) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        email: dto.email,
      },
    });
  }
}
