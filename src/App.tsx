import React, { Suspense, useCallback, useState } from 'react';
import { BC_SYNC_CHANNEL } from './globals';
import { City } from './types';
import { BroadcastStorageHelper } from './utils/BroadcastStorageHelper';
import { getCityNameResolver, getCityWeatherResolver } from './utils/net';
import { dataStorage } from './utils/storage/dataStorage';

const CitySearch = React.lazy(() => import('./components/CitySearch'));
const CityWeather = React.lazy(() => import('./components/CityWeather'));

const cityNameResolver = getCityNameResolver();
const cityWeatherResolver = getCityWeatherResolver();

new BroadcastStorageHelper(BC_SYNC_CHANNEL).startListening();

const dataStorageKey = 'city';

const fallbackIcon = <img src='logo192.png' alt='...loading' className='mr-auto ml-auto' />;

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
      <Suspense fallback={fallbackIcon}>
        <CitySearch
          currentCity={currentCity}
          setCurrentCity={setAndSaveCurrentCity}
          cityNameResolver={cityNameResolver}
        />
      </Suspense>
      {currentCity ? (
        <Suspense fallback=''>
          <CityWeather city={currentCity} cityWeatherResolver={cityWeatherResolver} />
        </Suspense>
      ) : (
        false
      )}
    </div>
  );
}

export default App;
