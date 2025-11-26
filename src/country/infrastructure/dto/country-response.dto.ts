import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de salida para exponer lod datos que necesitamos desde la API de contries.com.
 */
export class CountryResponseDto {
  @ApiProperty({ example: 'IT' })
  code: string;

  @ApiProperty({ example: 'Italy' })
  name: string;

  @ApiProperty({ example: 'Europe' })
  region: string;

  @ApiProperty({ example: 'Rome' })
  capital: string;
}
