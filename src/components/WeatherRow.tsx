import React from 'react';

interface Props {
  label: string;
  data: number;
  type?: DataType;
}

enum DataType {
  temp = 'temp',
  time = 'time',
}

const processors = {
  [DataType.temp]: (data: number) => Math.round(data),

  [DataType.time]: (data: number) => {
    let tempDate = new Date(data * 1000); // as getting it in epoch seconds
    const hrs = tempDate.getHours();
    const mins = tempDate.getMinutes();
    return `${hrs}:${mins}`;
  },
};

const additionals = {
  [DataType.temp]: '°',
  [DataType.time]: '',
};

const WeatherRow: React.FC<Props> = ({ label, data, type }) => {
  const processedData = type ? processors[type](data) : data;
  const additional = type && additionals[type];
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

export { WeatherRow, DataType };
