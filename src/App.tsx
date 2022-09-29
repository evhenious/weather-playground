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
const fallbackIconBig = <img src='logo512.png' alt='No City Selected' className='mr-auto ml-auto mix-blend-soft-light w-3/4 relative top-32' />;

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
      <Suspense fallback={'...loading'}>
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
        fallbackIconBig
      )}
    </div>
  );
}

export default App;
