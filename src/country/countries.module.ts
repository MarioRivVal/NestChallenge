import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { countriesController } from './infrastructure/countries.controller';
import { CountryService } from './application/country.service';
import { COUNTRY_PROVIDER } from './domain/country.provider';
import { RestCountriesClient } from './infrastructure/external/restcountries.client';
/**
 * Módulo del contexto de Countries.
 * - Usa HttpModule para llamar a la API externa
 * - Enlaza el puerto COUNTRY_PROVIDER con RestCountriesClient
 */

@Module({
  imports: [HttpModule],
  controllers: [countriesController],
  providers: [
    CountryService,
    {
      provide: COUNTRY_PROVIDER,
      useClass: RestCountriesClient,
    },
  ],
})
export class CountryModule {}
