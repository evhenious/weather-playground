import { City, CityResponse, GeoParamBuilder } from '../../types';
import Fetcher from './Fetcher';

class CityNameResolver extends Fetcher {
  constructor(baseUrl: string, private paramBuilder: GeoParamBuilder) {
    super(baseUrl);
  }

  public async fetchCityList(cityNamePart: string): Promise<City[]> {
    let resp: CityResponse | undefined;

    const [url, reqParams] = this.paramBuilder(cityNamePart);

    try {
      resp = await this.get<CityResponse>(url, reqParams);
    } catch (err) {
      console.error('Cannot fetch cities', err);
    }

    return resp?.data?.data || [];
  }
}

export default CityNameResolver;
