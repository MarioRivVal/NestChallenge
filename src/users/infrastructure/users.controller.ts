import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
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
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { CurrentUserData } from 'src/auth/decorators/current-user.decorator';
import { CustomLogger } from 'src/common/logger/custom-logger.service';

/**
 * Controller HTTP para el contexto de Users.
 * - Define las rutas /users
 * - Traduce entre HTTP (DTOs) y dominio (User)
 */
@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(UsersController.name);
  }

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
  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({
    description: 'List of all users',
    type: UserResponseDto,
    isArray: true,
  })
  async getAll(
    @CurrentUser() currentUser: CurrentUserData,
  ): Promise<UserResponseDto[]> {
    this.logger.log(currentUser);
    const users = await this.usersService.getAllUsers();

    return users.map((u) => this.toResponseDto(u));
  }

  // -------------------------------------------------------------- //
  /**
   * Solicita los datos de un usuario, buscado por ID
   * - Devuelve el usuario sin la clave hasheada
   */

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
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() currentUser: CurrentUserData,
  ): Promise<UserResponseDto> {
    this.logger.log(currentUser);
    const user = await this.usersService.getUserById(id);
    return this.toResponseDto(user);
  }

  // -------------------------------------------------------------- //
  /**
   * Edita los datos de un usuario, buscado por ID
   * - Todos los datos enviados son opcionales
   * - Devuelve el usuario editado sin la clave hasheada
   */
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
  @UseGuards(JwtAuthGuard)
  @Patch('user/:id')
  async update(
    @Body() body: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() currentUser: CurrentUserData,
  ): Promise<UserResponseDto> {
    this.logger.log(currentUser);
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
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid UUID format' })
  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() currentUser: CurrentUserData,
  ): Promise<void> {
    this.logger.log(currentUser);
    return this.usersService.deleteUser(id);
  }

  // -------------------------------------------------------------- //
  // NUEVO: GET /user/me (protegido) — usa el decorador para devolver el contexto

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    description: 'Current logged user info (from JWT)',
    schema: {
      example: {
        userId: '550e8400-e29b-41d4-a716-446655440000',
        username: 'mario',
        email: 'mario@example.com',
      },
    },
  })
  @Get('me')
  getMe(@CurrentUser() currentUser: CurrentUserData): CurrentUserData {
    return currentUser;
  }
}
