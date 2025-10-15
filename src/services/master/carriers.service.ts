import { CarriersApi, CreateCarrierDto } from '@/api';
import { createConfig } from '@/services/http';

export class CarriersService {
  private api: CarriersApi;
  constructor(token?: string) { this.api = new CarriersApi(createConfig(token)); }

  list() { return this.api.listCarriers(); }
  getById(id: number) { return this.api.getCarrierById(id); }
  create(payload: CreateCarrierDto) { return this.api.createCarrier(payload); }
}

export const carriersService = new CarriersService();


