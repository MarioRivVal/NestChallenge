import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '../application/country.service';
import { Country } from '../domain/country';
import { CountryResponseDto } from './dto/country-response.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Countries')
export class countriesController {
  constructor(private readonly countryService: CountryService) {}

  /**
   * Mapea Country (dominio) a DTO de respuesta para la API.
   */
  private toResponseDto(country: Country): CountryResponseDto {
    return {
      code: country.code,
      name: country.name,
      region: country.region,
      capital: country.capital,
    };
  }

  /**
   * GET /countries
   * Devuelve lista de países.
   */
  @Get('countries')
  @ApiOkResponse({
    description: 'List of all countries',
    type: CountryResponseDto,
    isArray: true,
  })
  async getAll(): Promise<CountryResponseDto[]> {
    const data = await this.countryService.getAllCountries();
    const countries = data.map((country) => this.toResponseDto(country));
    return countries;
  }

  // -------------------------------------------------------------- //

  /**
   * GET /country:code
   * Devuelve un country por CODE
   */
  @Get('country:code')
  @ApiParam({
    name: 'code',
    description: 'Country code (ISO alpha-2)',
    example: 'ES',
  })
  @ApiOkResponse({
    description: 'Country found',
    type: CountryResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Country not found' })
  async getByID(@Param('code') code: string): Promise<CountryResponseDto> {
    const country = await this.countryService.getCountryByCode(code);

    return this.toResponseDto(country);
  }
}
