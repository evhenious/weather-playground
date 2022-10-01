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

  const selectCityFromList = (index: number) => {
    if (cityList) {
      setCurrentCity(cityList[index]);
      setCityName(cityList[index].name);
    }
    setCityList(undefined);
  };

  const cancelCityChange = () => {
    setCityList(undefined);
    setCityName(currentCity?.name || '');
  };

  const inputHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(target.value);
  };

  const debouncedSearchHandler = useMemo(
    () =>
      debounce(async (cityName) => {
        if (cityName.length < 3 || cityName === currentCity?.name) {
          return;
        }

        const data = await cityNameResolver.fetchCityList(cityName);
        // TODO: show notification if no city found
        setCityList(data.filter((item) => item.type === 'CITY'));
      }, 400),
    [currentCity?.name, cityNameResolver]
  );

  // cleanup for debounced callback on unmount
  useEffect(() => {
    return () => debouncedSearchHandler.cancel();
  });

  useEffect(() => {
    // go and fetch city list to select from
    debouncedSearchHandler(cityName);
  }, [cityName, debouncedSearchHandler]);

  const radiusLabel = !!cityList?.length ? 'rounded-tl-md' : 'rounded-l-md';
  const radiusCountryLabel = !!cityList?.length ? 'rounded-tr-md' : 'rounded-r-md';

  const grayBorder = 'border border-gray-300';
  const grayLabeltext = 'text-sm text-gray-500 bg-gray-50';

  return (
    <div className='shadow sm:overflow-hidden'>
      <div className='px-4 py-5 bg-gray-200 space-y-6 sm:p-6'>
        <div className='block'>
          <div className='flex shadow-sm'>
            <span
              className={`inline-flex items-center px-3 ${radiusLabel} ${grayBorder} border-r-0 ${grayLabeltext}`}
            >
              Location
            </span>
            <input
              type='text'
              name='location'
              id='location'
              className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 rounded-none text-sm border-gray-300 placeholder-gray-400 focus:placeholder-transparent`}
              placeholder='type something, like London'
              value={cityName}
              onChange={inputHandler}
            />
            <span
              className={`inline-flex items-center px-3 ${radiusCountryLabel} ${grayBorder} border-l-0 ${grayLabeltext}`}
            >
              {currentCity?.country || 'N/A'}
            </span>
          </div>
          {cityList?.length ? <CityList data={cityList} onSelect={selectCityFromList} onCancel={cancelCityChange} /> : false}
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
