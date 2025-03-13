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
import { JwtGuard, RoleGuard } from '../auth/guards';
import { GetUser, Roles } from '../auth/decorators';
import { CreateUserDto } from './dtos/create-user.dto';
import { userRole } from './types';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMe(@GetUser('id') id: string) {
    const user = await this.userService.getUserById(id);

    return user;
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(userRole.SUPER_ADMIN)
  @Post('/create')
  async createUser(@Body() dto: CreateUserDto, @GetUser('id') id: string) {
    const currentUser = await this.userService.getUserById(id);

    if (!currentUser) throw new NotFoundException('User Not Found!');

    await this.userService.createUser(dto);

    return {
      status: 200,
      message: 'User created successfully!',
    };
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(userRole.SALE_PERSON)
  @Get('/me/leads')
  async getUserLeads(@GetUser('id') id: string) {
    const currentUser = await this.userService.getUserById(id);

    if (!currentUser) throw new NotFoundException('User Not Found!');

    return await this.userService.getUserLeads(currentUser.id);
  }
}
