import { CountriesApi, CreateCountryDto } from '@/api';
import { createConfig } from '@/services/http';

export class CountriesService {
  private api: CountriesApi;
  constructor(token?: string) {
    this.api = new CountriesApi(createConfig(token));
  }

  list() { return this.api.listCountries(); }
  getById(id: number) { return this.api.getCountryById(id); }
  create(payload: CreateCountryDto) { return this.api.createCountry(payload); }
}

export const countriesService = new CountriesService();


