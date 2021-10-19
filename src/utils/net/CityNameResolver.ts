import { City, CityResponse } from '../../types';
import Fetcher from './Fetcher';

class CityNameResolver extends Fetcher {
  constructor(baseUrl: string, private isLocal: boolean) {
    super(baseUrl);
  }

  public async fetchCityList(cityNamePart: string): Promise<City[]> {
    let resp: CityResponse | undefined;

    const geoReqParams = {
      hateoasMode: false,
      limit: 5,
      namePrefix: cityNamePart,
      offset: 0,
    };

    const lambdaParams = {
      url: '/v1/geo/cities',
      params: JSON.stringify(geoReqParams),
    };

    const url = this.isLocal ? lambdaParams.url : '/geo';
    const reqParams = this.isLocal ? geoReqParams : lambdaParams;

    try {
      resp = await this.get<CityResponse>(url, reqParams);
    } catch (err) {
      console.error('Cannot fetch cities', err);
    }

    return resp ? resp.data.data : [];
  }
}

export default CityNameResolver;
