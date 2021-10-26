import React, { useCallback, useState } from 'react';
import CitySearch from './components/CitySearch';
import CityWeather from './components/CityWeather';
import { City } from './types';
import { getCityNameResolver, getCityWeatherResolver } from './utils/net';
import { dataStorage } from './utils/storage/dataStorage';

const cityNameResolver = getCityNameResolver();
const cityWeatherResolver = getCityWeatherResolver();

const dataStorageKey = 'city';

function App() {
  const savedCity = dataStorage.getData<City>(dataStorageKey);
  const [currentCity, setCurrentCity] = useState<City | null>(savedCity);

  const setAndSaveCurrentCity = useCallback(
    (city: City) => {
      dataStorage.saveData(dataStorageKey, city);
      setCurrentCity(city);
    },
    [setCurrentCity]
  );

  return (
    <div className='bg-gradient-to-b from-black to-gray-200 min-h-screen'>
      <CitySearch
        currentCity={currentCity}
        setCurrentCity={setAndSaveCurrentCity}
        cityNameResolver={cityNameResolver}
      />
      {currentCity ? <CityWeather city={currentCity} cityWeatherResolver={cityWeatherResolver} /> : false}
    </div>
  );
}

export default App;
