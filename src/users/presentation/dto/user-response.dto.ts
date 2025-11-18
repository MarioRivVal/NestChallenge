import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'mario' })
  username: string;

  @ApiProperty({ example: 'mario@example.com' })
  email: string;
}
