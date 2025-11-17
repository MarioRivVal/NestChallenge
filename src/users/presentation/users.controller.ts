import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-reponse.dto';
import { User } from '../domain/user';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private toResponseDto(user: User): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }

  @Get()
  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.getAllUsers();

    return users.map((u) => this.toResponseDto(u));
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password } = body;

    const user = await this.usersService.createUser({
      username,
      email,
      password,
    });
    return this.toResponseDto(user);
  }
}
