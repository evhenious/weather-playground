import { City, ForecastResponse, Weather, WeatherResponse } from '../../types';
import { dataStorage } from '../storage/dataStorage';
import Fetcher, { Defaults } from './Fetcher';

const localStorageCacheKey = 'weather';

const WEATHER_API_ENDPOINTS = {
  getCurrentWeather: process.env.REACT_APP_WEATHER_EP_GET_WEATHER || '',
  getForecast: process.env.REACT_APP_WEATHER_EP_GET_FORECAST || ''
}

class CityWeatherResolver extends Fetcher {
  public cachedWeather: Weather | null = null;

  constructor(baseUrl: string, defaults: Defaults = {}) {
    super(baseUrl, defaults);
    this.cachedWeather = dataStorage.getData<Weather>(localStorageCacheKey);
  }

  public async fetchCityWeather(city: City): Promise<Weather | null> {
    const params = {
      q: `${city.name},${city.countryCode}`,
      units: 'metric',
    };

    let resp: WeatherResponse | undefined;

    try {
      resp = await this.get<WeatherResponse>(WEATHER_API_ENDPOINTS.getCurrentWeather, params);
      resp && dataStorage.saveData(localStorageCacheKey, resp.data);
    } catch (err) {
      console.error('Cannot fetch city weather', err);
    }

    return resp?.data || null;
  }

  public async fetchForecast(city: City) {
    const params = {
      lat: city.latitude,
      lon: city.longitude,
      units: 'metric',
      cnt: 8, // amount of result entries, step is 3 hrs
    };

    let resp;
    try {
      resp = await this.get<ForecastResponse>(WEATHER_API_ENDPOINTS.getForecast, params);
    } catch (err) {
      console.error('Cannot fetch weather forecast', err);
    }

    return resp?.data || null;
  }
}

export default CityWeatherResolver;

/*
const weatherResp = {
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
