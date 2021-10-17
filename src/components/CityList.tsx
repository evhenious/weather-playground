import React from 'react';
import { City } from '../types';

interface Props {
  data: City[];
  onSelect: (index: number) => void
}

const rowClassName = 'block px-4 py-3 bg-gray-100';

const CityList: React.FC<Props> = ({ data, onSelect }) => {
  const listItems = data.map((city, index) => {
    return (
      <div
        id={`${index}`}
        key={`${city.city}`}
        className={`${rowClassName} ${index === data.length - 1 ? 'rounded-b' : ''}`}
        onClick={() => onSelect(index)}
      >
        {city.name}, {city.country}
      </div>
    );
  });

  return <>{listItems}</>;
};

export default CityList;
