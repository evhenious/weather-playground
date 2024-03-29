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
  const tempColor = temp < 0 ? 'text-blue-200' : 'text-yellow-200';

  return (
    <div className='flex flex-nowrap md:flex-wrap md:min-w-full lg:min-w-[20%]'>
      <div id='data' className='pl-2 mx-auto'>
        <div className='ml-2'>{currentDate}</div>
        <div className='py-2 text-6xl flex justify-center'>
          <ThermoIcon className={`relative top-1 ${tempColor}`} />
          <span className='flex'>
            {temp}
            <span className='text-4xl align-top'>{symbol}</span>
          </span>
        </div>
        <div className='ml-2'>{`Feels like ${tempFeelsLike}${symbol}`}</div>
      </div>
      <div id='icon' className='flex flex-col mx-auto'>
        <div className='mx-auto'>{weather[0].description.toUpperCase()}</div>
        <WeatherIcon className='text-9xl pb-6' />
      </div>
    </div>
  );
};

export default WeatherMain;
