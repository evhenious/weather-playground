import React from 'react';
import { getIcon } from '../utils/iconMapper';

interface Props {
  label?: string;
  icon?: { name: string, iconClass?: string };
  children?: React.ReactElement[];
}

const WeatherTab: React.FC<Props> = ({ label, icon, children }) => {
  const Icon = icon && getIcon(icon.name);

  return (
    <div className='shadow bg-gray-200 bg-opacity-50 rounded-md px-3 py-3 relative md:min-w-[48%] lg:min-w-[20%]'>
      {Icon && <Icon className={`absolute right-3 my-auto h-full w-1/6 top-0 ${icon.iconClass || ''}`} />}
      {label && <h2 className='font-semibold'>{label}</h2>}
      {children}
    </div>
  );
};

export { WeatherTab };
