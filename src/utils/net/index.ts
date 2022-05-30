import CityNameResolver from './CityNameResolver';
import CityWeatherResolver from './CityWeatherResolver';
import { buildRequest } from './cityResolverParamBuilders';

/**
 * Factory method
 */
const getCityNameResolver = () => {
  const baseUrl = process.env.REACT_APP_GEODB_BASE_URL || '';

  return new CityNameResolver(baseUrl, buildRequest);
};

/**
 * Factory method
 */
const getCityWeatherResolver = () => {
  const baseUrl = process.env.REACT_APP_WEATHER_BASE_URL || '';

  const apiKey = {
    paramName: 'appid',
    key: process.env.REACT_APP_OPENWEATHER_API_KEY || '',
  };

  return new CityWeatherResolver(baseUrl, apiKey);
};

export { getCityNameResolver, getCityWeatherResolver };
