import { ResponsiveLine } from '@nivo/line';
import { DateTime } from 'luxon';

import { TempForecastData } from '../types';

const grayText = '#626262';
const grayerText = '#404040';
const chartColors = {
  pos: 'rgb(254, 243, 199)',
  neg: 'rgb(219, 234, 254)'
}

const nivoTheme = {
  textColor: 'white',
  fontSize: 14,
  axis: {
    ticks: {
      line: {
        stroke: grayText,
        strokeWidth: 2,
      },
      text: {
        fill: grayText,
      },
    },
  },
};

const chartAxisConfig = {
  axisTop: null,
  axisRight: null,
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    format: '%H:%M',
  },
  axisLeft: null,
};

interface Props {
  tempData: TempForecastData;
}

const getChartColors = (forecast: TempForecastData) => forecast.map((ch) => chartColors[ch.type as ('pos' | 'neg')])

const getYScale = (forecast: TempForecastData) => {
  const allChartOrdinates = forecast.flatMap(({ data }) => data).map(({ y }) => y ?? 0) || [];
  const scale = {
    type: 'linear',
    stacked: false,
    max: Math.max(...allChartOrdinates, 0) + 1,
    min: Math.min(...allChartOrdinates, 0)
  };

  return scale;
};

const markerNowPoint = () => {
  const moment = DateTime.now();

  return {
    axis: 'x',
    value: moment.toMillis(),
    lineStyle: { stroke: '#8a4f4d', strokeWidth: 2 },
    legend: moment.toFormat('T'),
    legendPosition: 'top-right',
    textStyle: { fontSize: '0.7em', fill: grayerText, fontWeight: 'bold' },
  };
};

const TempChart: React.FC<Props> = ({ tempData }) => {
  return (
    <div className='h-52 px-1'>
      <ResponsiveLine
        {...chartAxisConfig}
        animate={true}
        theme={nivoTheme}
        layers={['grid', 'axes', 'areas', 'lines', 'points', 'slices', 'mesh', 'legends', 'markers']}
        margin={{ left: 20, right: 20, bottom: 40, top: 15 }}
        data={tempData}
        curve={'monotoneX'}
        colors={getChartColors(tempData)}
        enableArea={true}
        areaOpacity={0.4}
        enablePoints={true}
        enablePointLabel={true}
        pointLabelYOffset={-10}
        pointLabel={(data) => `${data.y}`}
        enableGridX={false}
        enableGridY={false}
        xScale={{
          type: 'time',
          format: '%Y-%m-%d %H:%M:%S',
          precision: 'second',
          // useUTC: false
        }}
        xFormat='time:%Y-%m-%d %H:%M:%S'
        yScale={getYScale(tempData) as any}
        markers={[markerNowPoint() as any]}
      />
    </div>
  );
};

export default TempChart;
