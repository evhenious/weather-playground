import CityNameResolver from './CityNameResolver';
import CityWeatherResolver from './CityWeatherResolver';
import { buildRequest } from './cityResolverParamBuilders';

/**
 * Factory method
 */
const getCityNameResolver = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL || '';

  return new CityNameResolver(baseUrl, buildRequest);
};

/**
 * Factory method
 */
const getCityWeatherResolver = () => {
  const baseUrl = process.env.REACT_APP_WEATHER_BASE_URL || '';

  const params = {
    appid: process.env.REACT_APP_OPENWEATHER_API_KEY || '',
  };

  return new CityWeatherResolver(baseUrl, { params });
};

export { getCityNameResolver, getCityWeatherResolver };
