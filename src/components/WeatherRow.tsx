import React from 'react';
import * as formatter from '../utils/formatUtils';

interface Props {
  label: string;
  data: number;
  type?: formatter.DataType;
}

const WeatherRow: React.FC<Props> = ({ label, data, type }) => {
  const processedData = type ? formatter.processors[type](data) : data;
  const additional = (type && formatter.additionals[type]) || '';
  return (
    <div className='grid grid-cols-2'>
      <span>{label}</span>
      <div>
        {processedData}
        {additional}
      </div>
    </div>
  );
};

export default WeatherRow;
