import React from 'react';

interface Props {
  label: string;
  children?: React.ReactElement[];
}

const WeatherTab: React.FC<Props> = ({ label, children }) => {
  return (
    <div className='shadow bg-gray-200 bg-opacity-50 rounded-md px-3 py-3'>
      <h2 className='font-semibold'>{label}</h2>
      {children}
    </div>
  );
};

export { WeatherTab };
