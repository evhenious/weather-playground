import React from 'react';
import { City } from '../types';

interface Props {
  city: City
}

const CityWeather: React.FC<Props> = ({ city }) => {
  return <div className='py-10 flex justify-center text-gray-50'>{`Weather for ${city.name}, ${city.country} to be here`}</div>
}

export default CityWeather;