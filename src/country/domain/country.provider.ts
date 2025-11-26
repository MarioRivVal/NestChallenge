import { Country } from './country';

export const COUNTRY_PROVIDER = 'COUNTRY_PROVIDER';

export interface ICountryProvider {
  getAllCountries(): Promise<Country[]>;
  getCountryByCode(code: string): Promise<Country | null>;
}
