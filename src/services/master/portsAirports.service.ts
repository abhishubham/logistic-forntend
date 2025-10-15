import { PortsAirportsApi, CreatePortAirportDto } from '@/api';
import { createConfig } from '@/services/http';

export class PortsAirportsService {
  private api: PortsAirportsApi;
  constructor(token?: string) { this.api = new PortsAirportsApi(createConfig(token)); }

  list() { return this.api.listPortsAirports(); }
  getById(id: number) { return this.api.getPortAirportById(id); }
  create(payload: CreatePortAirportDto) { return this.api.createPortAirport(payload); }
}

export const portsAirportsService = new PortsAirportsService();


