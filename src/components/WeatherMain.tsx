import React from 'react';
import { Weather } from '../types';
import { processors, additionals } from '../utils/formatUtils';
import { getIcon } from '../utils/iconMapper';

const { temp: asTemp, date: asDate } = processors;
const { temp: symbol } = additionals;

interface Props {
  data: Weather;
}

const currentDate = asDate(Date.now());
const ThermoIcon = getIcon('thermo');

const WeatherMain: React.FC<Props> = ({ data }) => {
  const { main, weather } = data;
  const WeatherIcon = getIcon(weather[0].icon);

  const temp = asTemp(main.temp);
  const tempFeelsLike = asTemp(main.feels_like);

  return (
    <div className='grid grid-cols-2'>
      <div id='data' className='pl-4'>
        <div>{currentDate}</div>
        <div className='py-3 text-7xl flex'>
          <ThermoIcon className='relative top-1 -left-5' />
          {`${temp}${symbol}`}
        </div>
        <div>{`Feels like ${tempFeelsLike}${symbol}`}</div>
      </div>
      <div id='icon' className='flex flex-col mx-auto'>
        <div className='mx-auto'>{weather[0].description.toUpperCase()}</div>
        <WeatherIcon className='text-9xl pb-6' />
      </div>
    </div>
  );
};

export default WeatherMain;