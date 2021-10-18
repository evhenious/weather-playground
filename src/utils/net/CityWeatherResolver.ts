import { City } from '../../types';
import Fetcher from './Fetcher';

class CityWeatherResolver extends Fetcher {
  public async fetchCityWeather(city: City): Promise<any> {
    const params = {
      q: `${city.name},${city.countryCode}`,
      units: 'metric',
    };

    let resp = '';

    try {
      resp = await this.get<any>('/data/2.5/weather', params); // TODO: refactor 'any' to match example below
    } catch (err) {
      console.error('Cannot fetch city weather', err);
    }

    return resp;
  }
}

export default CityWeatherResolver;

/*
const resp = {
  coord: { lon: 24.0232, lat: 49.8383 },
  weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
  base: 'stations',
  main: { temp: 7.17, feels_like: 5.11, temp_min: 6.4, temp_max: 7.21, pressure: 1025, humidity: 98 },
  visibility: 6000,
  wind: { speed: 3, deg: 290 },
  clouds: { all: 90 },
  dt: 1634581248,
  sys: { type: 1, id: 8909, country: 'UA', sunrise: 1634532607, sunset: 1634570859 },
  timezone: 10800,
  id: 702550,
  name: 'Lviv',
  cod: 200,
};
*/
