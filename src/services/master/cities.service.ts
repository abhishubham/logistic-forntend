import { CitiesApi, CreateCityDto } from '@/api';
import { createConfig } from '@/services/http';

export class CitiesService {
  private api: CitiesApi;
  constructor(token?: string) { this.api = new CitiesApi(createConfig(token)); }

  list() { return this.api.listCities(); }
  getById(id: number) { return this.api.getCityById(id); }
  create(payload: CreateCityDto) { return this.api.createCity(payload); }
}

export const citiesService = new CitiesService();


