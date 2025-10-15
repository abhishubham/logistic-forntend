import { CommoditiesApi, CreateCommodityDto } from '@/api';
import { createConfig } from '@/services/http';

export class CommoditiesService {
  private api: CommoditiesApi;
  constructor(token?: string) { this.api = new CommoditiesApi(createConfig(token)); }

  list() { return this.api.listCommodities(); }
  getById(id: number) { return this.api.getCommodityById(id); }
  create(payload: CreateCommodityDto) { return this.api.createCommodity(payload); }
}

export const commoditiesService = new CommoditiesService();


