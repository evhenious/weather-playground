import { City, CityResponse } from '../../types';
import Fetcher from './Fetcher';

class CityNameResolver extends Fetcher {
  public async fetchCityList(cityNamePart: string): Promise<City[]> {
    let resp: CityResponse | undefined;

    const tempParams  = {
      hateoasMode: false,
      limit: 5,
      namePrefix: cityNamePart,
      offset: 0
    };

    const params = {
      url: '/v1/geo/cities',
      params: JSON.stringify(tempParams)
    }

    try {
      resp = await this.get<CityResponse>('/geo', params);
    } catch (err) {
      console.error('Cannot fetch cities', err);
    }

    return resp ? resp.data.data : [];
  }
}

export default CityNameResolver;
