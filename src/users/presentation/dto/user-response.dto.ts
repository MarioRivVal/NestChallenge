import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de salida para exponer datos de usuario al cliente.
 * - No incluye información sensible (ej: passwordHash)
 */
export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'mario' })
  username: string;

  @ApiProperty({ example: 'mario@example.com' })
  email: string;
}
