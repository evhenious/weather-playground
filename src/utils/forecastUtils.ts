import { DateTime } from 'luxon';
import { ForecastObject, TempForecastData } from '../types';
import { DataType, processors } from './formatUtils';

/**
 * Inserts custom date point as a first chart point if there is not cached data and forecast starts ahead of NOW
 */
const setupChartStartPoint = (chartLines: TempForecastData, { list, city }: ForecastObject) => {
  const firstPoint = list[0]; // we care only about the very first section

  if (firstPoint.dt + city.timezone / 60 > Math.round(Date.now() / 1000)) {
    const prevDatePoint = DateTime.fromSeconds(firstPoint.dt, { zone: 'UTC' })
      .minus({ hours: 3 }) //! not a timeshift, just minus 3hrs
      .toFormat('yyyy-MM-dd TT');

    const customFirstPoint = {
      x: prevDatePoint,
      y: processors[DataType.temp](firstPoint.main.temp)
    };
    chartLines[0].data.unshift(customFirstPoint);
    chartLines[chartLines.length - 1].data.pop(); // keeping one spare forecast step
  }
};

/**
 * Transforms forecast data list into x-y values used to draw temp chart
 */
function makeTempChartData({ list, city }: ForecastObject) {
  const chartLines: TempForecastData = [
    { id: 'temp-0', data: [], type: 'pos' },
    { id: 'temp-1', data: [], type: 'neg' },
  ];

  const tempCheckers = {
    pos: (temp: number) => temp >= 0,
    neg: (temp: number) => temp <= 0
  }

  list.forEach(({ main, dt_txt }, index, arr) => {
    const x = dt_txt;
    const { temp } = main;
    const prevTemp = arr[index - 1]?.main.temp || temp;

    const isChartSwitch = (prevTemp > 0 && temp <= 0) || (prevTemp <= 0 && temp > 0);

    chartLines.forEach((chart) => {
      const point = {
        x,
        y: (isChartSwitch || tempCheckers[chart.type](temp)) ? processors[DataType.temp](temp) : null
      };
      chart.data.push(point);
    });
  });

  setupChartStartPoint(chartLines, { list, city });

  return chartLines;
}

export { makeTempChartData };
