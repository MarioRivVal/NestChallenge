import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../domain/user';
import {
  ApiTags,
  ApiOkResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

/**
 * Controller HTTP para el contexto de Users.
 * - Define las rutas /users
 * - Traduce entre HTTP (DTOs) y dominio (User)
 */
@ApiTags('Users')
@Controller()
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
  /**
   * Crea el usuario nuevo
   * - Recibe el body
   * - Devuelve el usuario creado sin la clave hasheada
   */
  @Post('user')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User successfully created',
    type: UserResponseDto,
  })
  @ApiConflictResponse({
    description: 'Email already exists',
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
  /**
   * Solicita la lista de los usuarios en BD
   * - Devuelve el array de todos usuarios sin la clave hasheada
   * - Si no hay usuarios devuelve un array vacio
   */
  @Get('users')
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
  /**
   * Solicita los datos de un usuario, buscado por ID
   * - Devuelve el usuario sin la clave hasheada
   */

  @Get('user/:id')
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
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.getUserById(id);
    return this.toResponseDto(user);
  }

  // -------------------------------------------------------------- //
  /**
   * Edita los datos de un usuario, buscado por ID
   * - Todos los datos enviados son opcionales
   * - Devuelve el usuario editado sin la clave hasheada
   */
  @Patch('user/:id')
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiOkResponse({
    description: 'User updated',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email already exists' })
  async update(
    @Body() body: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.updateUser({
      id,
      username: body.username,
      email: body.email,
      password: body.password,
    });

    return this.toResponseDto(user);
  }

  // -------------------------------------------------------------- //
  /**
   * Elimina un usuario, seleccionado por ID
   * - No devuelve nada, solo un mensaje de OK
   */
  @Delete('user/:id')
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
