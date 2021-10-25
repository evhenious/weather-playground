import React, { useEffect, useState } from 'react';
import { City, Weather } from '../types';
import { DataType } from '../utils/formatUtils';
import WeatherMain from './WeatherMain';
import WeatherRow from './WeatherRow';
import { WeatherTab } from './WeatherTab';

// The idea of this type - to not be locked on current CityWeatherResolver class,
// just on key point of fetcher method availability
type WeatherResolver = { fetchCityWeather: (city: City) => Promise<Weather | undefined> };

interface Props {
  city: City;
  cityWeatherResolver: WeatherResolver;
}

const fetchCityWeather = async (city: City, resolver: WeatherResolver, setWeather: Function) => {
  const data = await resolver.fetchCityWeather(city);
  setWeather(data);
};

/**
 * Component responsible for showing city weather
 */
const CityWeather: React.FC<Props> = ({ city, cityWeatherResolver }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetchCityWeather(city, cityWeatherResolver, setWeather);
  }, [city, cityWeatherResolver]);

  return (
    <div className='px-5 py-10 gap-y-5 flex flex-col text-gray-50'>
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
          <WeatherTab label='Wind'>
            <WeatherRow label='Speed' data={weather.wind.speed} />
            <WeatherRow label='Direction' data={weather.wind.deg} />
          </WeatherTab>
          <WeatherTab label='Sunlight Time'>
            <WeatherRow label='Sunrise' data={weather.sys.sunrise} type={DataType.time} />
            <WeatherRow label='Sunset' data={weather.sys.sunset} type={DataType.time} />
          </WeatherTab>
        </>
      )}
    </div>
  );
};

export default CityWeather;
