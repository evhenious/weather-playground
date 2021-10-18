import React, { useEffect, useState } from 'react';
import { City } from '../types';

interface Props {
  city: City;
  cityWeatherResolver: { fetchCityWeather: (city: City) => Promise<any> }; // TODO: refactor this 'any' to type
}

const fetchCityWeather = async (city: City, resolver: any, setter: Function) => {
  const data = await resolver.fetchCityWeather(city);
  setter(data);
};

const CityWeather: React.FC<Props> = ({ city, cityWeatherResolver }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetchCityWeather(city, cityWeatherResolver, setWeather);
  }, [city, cityWeatherResolver]);

  return (
    <div className='py-10 flex justify-center text-gray-50'>
      {`Weather for ${city.name}, ${city.country} to be here`}
      {JSON.stringify(weather)}
    </div>
  );
};

export default CityWeather;
