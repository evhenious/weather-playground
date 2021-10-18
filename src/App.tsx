import React, { useState } from 'react';
import CitySearch from './components/CitySearch';
import CityWeather from './components/CityWeather';
import { City } from './types';
import { getCityNameResolver, getCityWeatherResolver } from './utils/net';

const cityNameResolver = getCityNameResolver();
const cityWeatherResolver = getCityWeatherResolver();

function App() {
  const [currentCity, setCurrentCity] = useState<City>();

  return (
    <div className='bg-gradient-to-b from-black to-gray-50 min-h-screen'>
      <CitySearch currentCity={currentCity} setCurrentCity={setCurrentCity} cityNameResolver={cityNameResolver}/>
      {currentCity ? <CityWeather city={currentCity} cityWeatherResolver={cityWeatherResolver} /> : false}
    </div>
  );
}

export default App;
