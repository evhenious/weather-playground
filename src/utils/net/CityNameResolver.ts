import { City, CityResponse } from '../../types';
import Fetcher from './Fetcher';

type ParamBuilder = (arg0: string) => [string, { [key: string]: string | number | boolean }];

class CityNameResolver extends Fetcher {
  constructor(baseUrl: string, private paramBuilder: ParamBuilder) {
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

    return resp ? resp.data.data : [];
  }
}

export default CityNameResolver;
