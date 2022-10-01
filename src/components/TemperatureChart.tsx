import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';
import { City } from '../types';

import { additionals, DataType, processors } from '../utils/formatUtils';

const grayText = '#626262';

const nivoTheme = {
  textColor: 'white',
  fontSize: 15,
  axis: {
    ticks: {
      line: {
        stroke: grayText,
        strokeWidth: 2
      },
      text: {
        fill: grayText
      }
    }
  }
};

const chartAxisConfig = {
  axisTop: null,
  axisRight: null,
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    format: "%H:%M",
  },
  axisLeft: null,
}

type ForecastResolver = {
  fetchForecast: (city: City) => Promise<any>; //! fixme: TYPE
}

interface Props {
  city: City;
  forecastResolver: ForecastResolver
}

const TempChart: React.FC<Props> = ({ city, forecastResolver }) => {
  const [forecast, setForecast] = useState<any>([]); //! fixme: TYPE

  useEffect(() => {
    forecastResolver.fetchForecast(city)
      .then((data) => { console.log(data); return data })
      .then((data) => setForecast(mapForecast(data.list)))
  }, [city, forecastResolver]);

  function mapForecast (data: any) {
    const lines: any = [
      { id: 'pos', data: [] },
      { id: 'neg', data: [] },
    ];

    data?.forEach(({ main, dt_txt }: any) => {
      const { temp } = main;
      const x = dt_txt;
      const y = processors[DataType.temp](temp);

      if (temp > 0) {
        lines[0].data.push({ x, y })
      } else {
        lines[1].data.push({ x, y })
      }
    });

    return lines;
  }

  const getYScale = (forecast: any) => {
    const scale = {
      type: 'linear',
      stacked: false,
      max: Math.max(...(forecast?.[0]?.data.map(({ y }: any) => y) || []), 0) + 1,
      min: Math.min(...(forecast?.[1]?.data.map(({ y }: any) => y) || []), 0),
    };

    return scale;
  }

  return (
    <div className='h-80 px-1'>
      <ResponsiveLine
        {...chartAxisConfig}

        animate={true}
        theme={nivoTheme}
        margin={{ left: 20, right: 20, bottom: 40, top: 10 }}

        data={forecast}

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
          precision: "second",
          // useUTC: false
        }}
        xFormat="time:%Y-%m-%d %H:%M:%S"

        yScale={getYScale(forecast) as any}
      />
    </div>
  );
};

export default TempChart;
