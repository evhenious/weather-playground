import React, { useEffect, useState } from 'react';
import useLocalCachedState from '../custom_hooks/useLocalCachedState';
import { City, Weather } from '../types';
import { DataType } from '../utils/formatUtils';
import WeatherMain from './WeatherMain';
import WeatherRow from './WeatherRow';
import { WeatherTab } from './WeatherTab';

// The idea of this type - to not be locked on current CityWeatherResolver class,
// just on key point of fetcher method availability
type WeatherResolver = {
  fetchCityWeather: (city: City) => Promise<Weather | null>;
};

interface Props {
  city: City;
  cityWeatherResolver: WeatherResolver;
}

const loadingIcon = <img src='logo192_single.png' alt='...loading' className='absolute right-5 w-1/12' />;

/**
 * Component responsible for showing city weather
 */
const CityWeather: React.FC<Props> = ({ city, cityWeatherResolver }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [weather, setWeather] = useLocalCachedState<Weather>('weather');

  useEffect(() => {
    setIsFetching(true);

    cityWeatherResolver.fetchCityWeather(city).then((data) => {
      setIsFetching(false);
      setWeather(data);
    });
  }, [city, cityWeatherResolver, setWeather]);

  return (
    <div className='px-5 py-10 gap-y-5 flex flex-col text-gray-50 md:flex-row md:gap-x-3 md:flex-wrap md:justify-around md:px-2'>
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
          <WeatherTab label='Wind' icon={{ name: 'wind', iconClass: 'text-blue-100' }}>
            <WeatherRow label='Speed' data={weather.wind.speed} type={DataType.speed} />
            <WeatherRow label='Direction' data={weather.wind.deg} type={DataType.direction} />
          </WeatherTab>
          <WeatherTab label='Sunlight Time' icon={{ name: 'sunlight', iconClass: 'text-yellow-100' }}>
            <WeatherRow label='Sunrise' data={weather.sys.sunrise} type={DataType.time} />
            <WeatherRow label='Sunset' data={weather.sys.sunset} type={DataType.time} />
            <WeatherRow label='Daylight' data={weather.sys.sunset - weather.sys.sunrise} type={DataType.timespan} />
          </WeatherTab>
        </>
      )}
    </div>
  );
};

export default CityWeather;
