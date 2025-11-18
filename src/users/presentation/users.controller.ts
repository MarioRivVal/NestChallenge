import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from '../domain/user';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
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

  // -------------------------------------------------------------- //
  @Get()
  @ApiOkResponse({
    description: 'List of all users',
    type: UserResponseDto,
    isArray: true,
  })
  async getAll(): Promise<UserResponseDto[]> {
    const users = await this.usersService.getAllUsers();

    return users.map((u) => this.toResponseDto(u));
  }
  // -------------------------------------------------------------- //
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  async create(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    const { username, email, password } = body;

    const user = await this.usersService.createUser({
      username,
      email,
      password,
    });
    return this.toResponseDto(user);
  }

  // -------------------------------------------------------------- //

  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'User FOUND',
    type: UserResponseDto,
  })
  @ApiNotFoundResponse({ description: ' User not found' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.getUserById(id);
    return this.toResponseDto(user);
  }
}
