import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginResult } from '../application/auth.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * Controller HTTP para autenticación.
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'Login successful' })
  @ApiBadRequestResponse({ description: 'Invalid body payload' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async login(@Body() body: LoginDto): Promise<LoginResult> {
    const { email, password } = body;

    return this.authService.login(email, password);
  }
}
