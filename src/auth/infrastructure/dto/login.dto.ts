import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

/**
 * DTO de entrada para login.
 */
export class LoginDto {
  @ApiProperty({ example: 'mario@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'Mario2025!!' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
