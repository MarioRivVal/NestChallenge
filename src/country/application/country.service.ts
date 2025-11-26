import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Country } from '../domain/country';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { COUNTRY_PROVIDER } from '../domain/country.provider';
import type { ICountryProvider } from '../domain/country.provider';

@Injectable()
export class CountryService {
  constructor(
    @Inject(COUNTRY_PROVIDER)
    private readonly countryProvider: ICountryProvider,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(CountryService.name);
  }

  // -------------------------------------------------------------- //

  async getAllCountries(): Promise<Country[]> {
    this.logger.log('Getting all countries');

    try {
      return await this.countryProvider.getAllCountries();
    } catch (error) {
      this.logger.error(`Error fetching all countries: ${String(error)}`);
      throw new InternalServerErrorException(
        'Error fetching countries. Please try again later.',
      );
    }
  }

  // -------------------------------------------------------------- //

  async getCountryByCode(code: string): Promise<Country> {
    this.logger.log(`Getting country by code: ${code}`);

    try {
      const country = await this.countryProvider.getCountryByCode(code);

      if (!country) {
        this.logger.warn(`Country with code ${code} not found`);
        throw new NotFoundException('Country not found');
      }

      return country;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(`Error fetching country ${code}: ${String(error)}`);
      throw new InternalServerErrorException(
        'Error fetching country. Please try again later.',
      );
    }
  }
}
