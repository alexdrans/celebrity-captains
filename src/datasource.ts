import { RESTDataSource } from 'apollo-datasource-rest';

export class ShippingAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = '';
  }

  async getShip(id: any) {
    return this.get(`/ships/${id}`);
  }
}
