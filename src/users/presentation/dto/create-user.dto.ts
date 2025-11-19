// src/users/presentation/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

/**
 * DTO de entrada para crear un usuario.
 * - Define y valida los campos que el cliente debe enviar en el body del POST /users
 */

export class CreateUserDto {
  @ApiProperty({ example: 'mario', description: 'User name' })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({ example: 'mario@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'Mario2025!!',
    description:
      'Password of at least 10 characters, including uppercase, lowercase, number and symbol',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(10, { message: 'Password must be at least 10 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must include uppercase, lowercase, number and special character',
  })
  password: string;
}
