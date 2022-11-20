import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TempChart from '../components/TemperatureChart';
import { city, listPositive, listPosNeg, listPosNegPos } from './datasets';
import { makeTempChartData } from '../utils/forecastUtils';

export default {
  title: 'Temperature Chart',
  component: TempChart,
  argTypes: {
    city: {
      description: 'Current city data with timezone'
    },
    list: {
      description: 'Chart data for positive and negative temp points separately',
    },
  },
} as ComponentMeta<typeof TempChart>;

const Template: ComponentStory<typeof TempChart> = (args: any) => (
  <div className='m-auto w-5/6'>
    <TempChart {...args} />;
  </div>
);

export const AllPositiveTemp = Template.bind({});
AllPositiveTemp.args = { tempData: makeTempChartData({ city, list: listPositive }) };

export const PosNegTemp = Template.bind({});
PosNegTemp.args = { tempData: makeTempChartData({ city, list: listPosNeg }) };

export const PosNegPosTemp = Template.bind({});
PosNegPosTemp.args = { tempData: makeTempChartData({ city, list: listPosNegPos }) };
