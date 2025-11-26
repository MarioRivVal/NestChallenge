import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Country } from '../../domain/country';
import { ICountryProvider } from '../../domain/country.provider';
import { CustomLogger } from 'src/common/logger/custom-logger.service';
import { ICountry } from '../interfaces/ICountry';

@Injectable()
export class RestCountriesClient implements ICountryProvider {
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  constructor(
    private readonly http: HttpService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext(RestCountriesClient.name);
  }

  // -------------------------------------------------------------- //

  private mapToDomain(item: ICountry): Country {
    const countryCode = item.cca2;
    const name = item.name?.common ?? 'Unknown';
    const region = item.region ?? 'Unknown';
    const capital = item.capital?.[0] ?? 'Unknown';

    return new Country(countryCode, name, region, capital);
  }

  // -------------------------------------------------------------- //

  async getAllCountries(): Promise<Country[]> {
    this.logger.log('Fetching all countries from RestCountries API');

    const url = `${this.baseUrl}/all?fields=cca2,name,region,capital`;
    const { data } = await firstValueFrom(this.http.get<ICountry[]>(url));

    return data.map((item) => this.mapToDomain(item));
  }

  // -------------------------------------------------------------- //

  async getCountryByCode(code: string): Promise<Country | null> {
    this.logger.log(`Fetching country by code: ${code}`);

    try {
      const url = `${this.baseUrl}/alpha/${code}?fields=cca2,name,region,capital`;
      const { data } = await firstValueFrom(this.http.get<ICountry[]>(url));

      const item = data[0];
      if (!item) return null;

      return this.mapToDomain(item);
    } catch (error) {
      const status = (error as { response?: { status?: number } }).response
        ?.status;

      if (status === 404) {
        this.logger.warn(`Country not found in RestCountries API: ${code}`);
        return null;
      }

      throw error;
    }
  }
}
