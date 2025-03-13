import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';
import { CreateUserDto } from './dtos/create-user.dto';
import { userRole } from './types';
// import checkSelfPermissioin from '../../src/utils/check-self-permission';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMe(@GetUser('id') id: string) {
    const user = await this.userService.getUserById(id);

    return user;
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async createUser(@Body() dto: CreateUserDto, @GetUser('id') id: string) {
    const currentUser = await this.userService.getUserById(id);

    if (!currentUser) throw new NotFoundException('User Not Found!');

    if (currentUser?.role !== userRole.SUPER_ADMIN)
      throw new UnauthorizedException('You are not authorized to create user!');

    await this.userService.createUser(dto);

    return {
      status: 200,
      message: 'User created successfully!',
    };
  }
}
