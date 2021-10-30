import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { City } from '../types';
import CityList from './CityList';

interface Props {
  currentCity: City | null;
  setCurrentCity: (city: City) => void;
  cityNameResolver: { fetchCityList: (namePart: string) => Promise<City[]> };
}

const CitySearch: React.FC<Props> = ({ currentCity, setCurrentCity, cityNameResolver }) => {
  const [cityName, setCityName] = useState<string>(currentCity?.name || '');
  const [cityList, setCityList] = useState<City[]>();
  const [isCityChosen, setCityChosen] = useState(!!currentCity);

  const selectCity = (index: number) => {
    if (cityList) {
      setCityChosen(true);
      setCurrentCity(cityList[index]);
      setCityName(cityList[index].name);
    }
    setCityList([]);
  };

  const cancelCityChange = () => {
    setCityChosen(true);
    setCityList([]);
    setCityName(currentCity?.name || '');
  };

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(target.value);
    isCityChosen && setCityChosen(false);
  };

  const debouncedSearchHandler = useMemo(
    () =>
      debounce(async (cityName) => {
        if (cityName.length < 3 || isCityChosen) {
          return;
        }

        const data = await cityNameResolver.fetchCityList(cityName);
        // TODO: show notification if no city found
        setCityList(data);
      }, 400),
    [isCityChosen, cityNameResolver]
  );

  // cleanup for debounced callback on unmount
  useEffect(() => {
    return () => debouncedSearchHandler.cancel();
  });

  useEffect(() => {
    // go and fetch city list to select from
    debouncedSearchHandler(cityName);
  }, [cityName, debouncedSearchHandler]);

  const radiusInput = !!cityList?.length ? 'rounded-tr-md' : 'rounded-r-md';
  const radiusLabel = !!cityList?.length ? 'rounded-tl-md' : 'rounded-l-md';

  return (
    <div className='shadow sm:rounded-md sm:overflow-hidden'>
      <div className='px-4 py-5 bg-gray-200 space-y-6 sm:p-6'>
        <div className='block'>
          <div className='mt-1 flex shadow-sm'>
            <span
              className={`inline-flex items-center px-3 ${radiusLabel} border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm`}
            >
              Your city is:
            </span>
            <input
              type='text'
              name='location'
              id='location'
              className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none ${radiusInput} sm:text-sm border-gray-300 placeholder-gray-400 focus:placeholder-transparent`}
              placeholder='type something, like London'
              value={cityName}
              onChange={inputHandler}
            />
          </div>
          {cityList?.length ? <CityList data={cityList} onSelect={selectCity} onCancel={cancelCityChange} /> : false}
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
