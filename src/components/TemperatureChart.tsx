import { ResponsiveLine } from '@nivo/line';
import { TempForecastData } from '../types';

const grayText = '#626262';

const nivoTheme = {
  textColor: 'white',
  fontSize: 15,
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

const getYScale = (forecast: TempForecastData) => {
  const scale = {
    type: 'linear',
    stacked: false,
    max: Math.max(...(forecast[0].data.map(({ y }) => y) || []), 0) + 1,
    min: Math.min(...(forecast[1].data.map(({ y }) => y) || []), 0),
  };

  return scale;
};

const TempChart: React.FC<Props> = ({ tempData }) => {
  return (
    <div className='h-52 px-1'>
      <ResponsiveLine
        {...chartAxisConfig}
        animate={true}
        theme={nivoTheme}
        margin={{ left: 20, right: 20, bottom: 40, top: 15 }}
        data={tempData}
        curve={'monotoneX'}
        colors={['rgb(254, 243, 199)', 'rgb(219, 234, 254)']}
        enableArea={true}
        areaOpacity={0.4}
        enablePoints={true}
        enablePointLabel={true}
        pointLabelYOffset={-15}
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
      />
    </div>
  );
};

export default TempChart;
