import React from 'react';
import { getIcon } from '../utils/iconMapper';

interface Props {
  label?: string;
  icon?: string;
  children?: React.ReactElement[];
}

const WeatherTab: React.FC<Props> = ({ label, icon, children }) => {
  const Icon = icon && getIcon(icon);

  return (
    <div className='shadow bg-gray-200 bg-opacity-50 rounded-md px-3 py-3 relative'>
      {Icon && <Icon className='absolute right-3 my-auto h-full w-1/6 top-0' />}
      {label && <h2 className='font-semibold'>{label}</h2>}
      {children}
    </div>
  );
};

export { WeatherTab };
