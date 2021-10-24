import CityNameResolver from './CityNameResolver';
import CityWeatherResolver from './CityWeatherResolver';
import { buildLocalRequest, buildRequest } from './cityResolverParamBuilders';

/**
 * Factory method
 */
const getCityNameResolver = () => {
  const baseUrl = process.env.REACT_APP_GEODB_BASE_URL || '';
  const isLocal = process.env.NODE_ENV === 'development';

  return new CityNameResolver(baseUrl, isLocal ? buildLocalRequest : buildRequest);
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
