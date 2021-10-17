import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { fetchCityList } from '../utils/cityResolver';
import { City } from '../types';
import CityList from './CityList';

const CitySearch: React.FC = () => {
  const [cityName, setCityName] = useState<string>('');
  const [cityList, setCityList] = useState<City[]>();
  const [isCityChosen, setCityChosen] = useState(false);

  const selectCity = (index: number) => {
    setCityChosen(true);
    cityList && setCityName(cityList[index].name);
    setCityList([]);
  }

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(target.value);
    setCityChosen(false);
  };

  const debouncedSearchHandler = useMemo(
    () =>
      debounce(async (cityName) => {
        if (cityName.length < 3 || isCityChosen) {
          return;
        }

        const data = await fetchCityList(cityName);
        setCityList(data);
      }, 400),
    [isCityChosen]
  );

  // cleanup for debounced callback on unmount
  useEffect(() => {
    return () => debouncedSearchHandler.cancel();
  });

  useEffect(() => {
    // go and fetch city list to select from
    debouncedSearchHandler(cityName);
  }, [cityName, debouncedSearchHandler]);

  return (
    <div className='shadow sm:rounded-md sm:overflow-hidden bg-opacity-60'>
      <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
        <div className='grid grid-cols-3 gap-6'>
          <div className='col-span-3 sm:col-span-2'>
            <div className='mt-1 flex rounded-md shadow-sm'>
              <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
                Your city is:
              </span>
              <input
                type='text'
                name='location'
                id='location'
                className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 placeholder-gray-400 focus:placeholder-transparent'
                placeholder='type something, like London'
                value={cityName}
                onChange={inputHandler}
              />
            </div>
            {cityList?.length ? <CityList data={cityList} onSelect={selectCity}/> : false}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
