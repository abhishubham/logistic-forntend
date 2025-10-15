import { PartiesApi, CreatePartyDto } from '@/api';
import { createConfig } from '@/services/http';

export class PartiesService {
  private api: PartiesApi;
  constructor(token?: string) { this.api = new PartiesApi(createConfig(token)); }

  list() { return this.api.listParties(); }
  getById(id: number) { return this.api.getPartyById(id); }
  create(payload: CreatePartyDto) { return this.api.createParty(payload); }
}

export const partiesService = new PartiesService();


