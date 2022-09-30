import React from 'react';
import { City } from '../types';

interface Props {
  data: City[];
  onSelect: (index: number) => void;
  onCancel: () => void;
}

const rowClassName = 'block px-4 py-3 bg-gray-100';

const CityList: React.FC<Props> = ({ data, onSelect, onCancel }) => {
  const listItems = data
    .filter((item) => item.type === 'CITY')
    .map((city, index) => {
      return (
        <div id={`${index}`} key={`${city.id}-${city.name}`} className={rowClassName} onClick={() => onSelect(index)}>
          {city.name}, {city.country}
        </div>
      );
    });

  return (
    <div className='object-contain'>
      {listItems}
      <div className='bg-red-500 text-white flex justify-center px-4 py-3 rounded-b-md font-medium' onClick={onCancel}>
        Cancel
      </div>
    </div>
  );
};

export default CityList;
