import React, { Suspense, useCallback, useState } from 'react';
import CitySearch from './components/CitySearch';
import { City } from './types';
import { getCityNameResolver, getCityWeatherResolver } from './utils/net';
import { dataStorage } from './utils/storage/dataStorage';

const CityWeather = React.lazy(() => import('./components/CityWeather'));

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
    <div className='bg-gradient-to-b from-black to-gray-300 min-h-screen'>
      <CitySearch
        currentCity={currentCity}
        setCurrentCity={setAndSaveCurrentCity}
        cityNameResolver={cityNameResolver}
      />
      {currentCity ? (
        <Suspense fallback="">
          <CityWeather city={currentCity} cityWeatherResolver={cityWeatherResolver} />
        </Suspense>
      ) : (
        false
      )}
    </div>
  );
}

export default App;
