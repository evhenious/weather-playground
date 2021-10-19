import CityNameResolver from "./CityNameResolver";
import CityWeatherResolver from "./CityWeatherResolver";

/**
 * Factory method
 */
const getCityNameResolver = () => {
  const baseUrl = process.env.REACT_APP_GEODB_BASE_URL || '';
  const isLocal = process.env.NODE_ENV === 'development';

  return new CityNameResolver(baseUrl, isLocal);
}

/**
 * Factory method
 */
const getCityWeatherResolver = () => {
  const baseUrl = process.env.REACT_APP_WEATHER_BASE_URL || '';

  const apiKey = {
    paramName: 'appid',
    key: process.env.REACT_APP_OPENWEATHER_API_KEY || ''
  }

  return new CityWeatherResolver(baseUrl, apiKey);
}

export {
  getCityNameResolver,
  getCityWeatherResolver
}