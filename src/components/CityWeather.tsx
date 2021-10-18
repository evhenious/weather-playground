import React, { useEffect, useState } from 'react';
import { City } from '../types';
import * as fetcher from '../utils/cityWeatherResolver';

interface Props {
  city: City
}

fetcher.setApiKey(process.env.REACT_APP_OPENWEATHER_API_KEY || '');

const fetchCityWeather = async (city: City, setter: Function) => {
  const data = await fetcher.fetchCityWeather(city);
  setter(data);
}

const CityWeather: React.FC<Props> = ({ city }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetchCityWeather(city, setWeather);
  }, [city]);

  return <div className='py-10 flex justify-center text-gray-50'>
    {`Weather for ${city.name}, ${city.country} to be here`}
    {JSON.stringify(weather)}
    </div>
}

export default CityWeather;