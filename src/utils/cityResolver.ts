import axios from 'axios';
import { CityResponse } from '../types';

const fetcher = axios.create({
  baseURL: 'http://geodb-free-service.wirefreethought.com',
});

const defaultParams = {
  hateoasMode: false,
  limit: 5,
  offset: 0,
};

/**
 * Fetches up to 5 available cities based on provided city name part.
 *
 * @param cityNamePart
 *
 * @returns Promise<City[]>
 */
const fetchCityList = async (cityNamePart: string) => {
  const params = {
    ...defaultParams,
    namePrefix: cityNamePart,
  };

  let resp: CityResponse | undefined;

  try {
    resp = await fetcher.get('/v1/geo/cities', { params });
  } catch (err) {
    console.error('Cannot fetch cities', err);
  }

  return resp ? resp.data.data : [];
};

export { fetchCityList };
