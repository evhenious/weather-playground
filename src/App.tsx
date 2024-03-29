import React, { Suspense } from 'react';
import useLocalCachedState from './custom_hooks/useLocalCachedState';
import { BC_SYNC_CHANNEL } from './globals';
import { City } from './types';
import { BroadcastStorageHelper } from './utils/BroadcastStorageHelper';
import { getCityNameResolver, getCityWeatherResolver } from './utils/net';

const CitySearch = React.lazy(() => import('./components/CitySearch'));
const CityWeather = React.lazy(() => import('./components/CityWeather'));
const Forecast = React.lazy(() => import('./components/Forecast'));

const cityNameResolver = getCityNameResolver();
const cityWeatherResolver = getCityWeatherResolver();

new BroadcastStorageHelper(BC_SYNC_CHANNEL).startListening();

const dataStorageKey = 'city';
const fallbackIconBig = <img src='logo512.png' alt='No City Selected' className='mr-auto ml-auto w-3/4 max-w-min mix-blend-soft-light relative top-32' />;

function App() {
  const [currentCity, setCurrentCity] = useLocalCachedState<City>(dataStorageKey);

  return (
    <div className='bg-gradient-to-b from-black to-gray-300 min-h-screen'>
      <Suspense fallback={'...loading'}>
        <CitySearch
          currentCity={currentCity}
          setCurrentCity={setCurrentCity}
          cityNameResolver={cityNameResolver}
        />
      </Suspense>
      {currentCity ? (
        <Suspense fallback=''>
          <CityWeather city={currentCity} cityWeatherResolver={cityWeatherResolver} />
          <Forecast city={currentCity} forecastResolver={cityWeatherResolver} />
        </Suspense>
      ) : (
        fallbackIconBig
      )}
    </div>
  );
}

export default App;
