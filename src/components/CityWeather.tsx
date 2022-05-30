import React, { useEffect, useState } from 'react';
import { City, Weather } from '../types';
import { DataType } from '../utils/formatUtils';
import WeatherMain from './WeatherMain';
import WeatherRow from './WeatherRow';
import { WeatherTab } from './WeatherTab';

// The idea of this type - to not be locked on current CityWeatherResolver class,
// just on key point of fetcher method availability
type WeatherResolver = {
  cachedWeather: Weather | null;
  fetchCityWeather: (city: City) => Promise<Weather | null>
};

interface Props {
  city: City;
  cityWeatherResolver: WeatherResolver;
}

const fetchCityWeather = async (city: City, resolver: WeatherResolver, setWeather: Function) => {
  const data = await resolver.fetchCityWeather(city);
  setWeather(data);
};

const loadingIcon = <img src='logo192_single.png' alt='...loading' className='absolute right-5 w-1/12' />;

/**
 * Component responsible for showing city weather
 */
const CityWeather: React.FC<Props> = ({ city, cityWeatherResolver }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [weather, setWeather] = useState<Weather | null>(cityWeatherResolver.cachedWeather);

  useEffect(() => {
    setIsFetching(true);

    const setFetchedWeather = (data: Weather | null) => {
      setIsFetching(false);
      setWeather(data);
    };

    fetchCityWeather(city, cityWeatherResolver, setFetchedWeather);
  }, [city, cityWeatherResolver]);

  return (
    <div className='px-5 py-10 gap-y-5 flex flex-col text-gray-50'>
      {isFetching && weather ? loadingIcon : false}
      {!weather ? (
        <WeatherTab label='Weather is Not Available...' />
      ) : (
        <>
          <WeatherMain data={weather} />
          <WeatherTab>
            <WeatherRow label='Visibility' data={weather.visibility} type={DataType.distance} />
            <WeatherRow label='Pressure' data={weather.main.pressure} type={DataType.pressure} />
            <WeatherRow label='Humidity' data={weather.main.humidity} type={DataType.humidity} />
          </WeatherTab>
          <WeatherTab label='Wind' icon='wind'>
            <WeatherRow label='Speed' data={weather.wind.speed} type={DataType.speed} />
            <WeatherRow label='Direction' data={weather.wind.deg} />
          </WeatherTab>
          <WeatherTab label='Sunlight Time' icon='sunlight'>
            <WeatherRow label='Sunrise' data={weather.sys.sunrise} type={DataType.time} />
            <WeatherRow label='Sunset' data={weather.sys.sunset} type={DataType.time} />
            <WeatherRow label='Daylight' data={weather.sys.sunrise - weather.sys.sunset} type={DataType.time} />
          </WeatherTab>
        </>
      )}
    </div>
  );
};

export default CityWeather;
