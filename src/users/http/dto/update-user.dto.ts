import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

/**
 * DTO de entrada para actualizar un usuario.
 * Todos los campos son opcionales (PATCH).
 */

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ example: 'mario' })
  @IsOptional()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiPropertyOptional({
    example: 'mario@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiPropertyOptional({
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
