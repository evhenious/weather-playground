import React from 'react';
import { Weather } from '../types';
import { processors, additionals } from '../utils/formatUtils';

const { temp: asTemp, date: asDate } = processors;
const { temp: symbol } = additionals;

interface Props {
  data: Weather;
}

const WeatherMain: React.FC<Props> = ({ data }) => {
  const { main, weather } = data;

  const currentDate = asDate(Date.now());
  const temp = asTemp(main.temp);
  const tempFeelsLike = asTemp(main.feels_like);

  return (
    <div className='grid grid-cols-2'>
      <div id='data' className='pl-4'>
        <div>{currentDate}</div>
        <div className='py-3 text-7xl'>{`${temp}${symbol}`}</div>
        <div>{`Feels like ${tempFeelsLike}${symbol}`}</div>
      </div>
      <div id='icon' className='flex flex-col mx-auto'>
        <div className='mx-auto'>{weather[0].description.toUpperCase()}</div>
        <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].main}></img>
      </div>
    </div>
  );
};

export default WeatherMain;
