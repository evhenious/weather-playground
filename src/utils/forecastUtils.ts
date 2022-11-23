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
  ];

  let activeChartIndex = 0;
  list.forEach(({ main, dt_txt }, index, arr) => {
    const { temp } = main;
    const x = dt_txt;
    const y = processors[DataType.temp](temp);

    let activeChart = chartLines[activeChartIndex];
    activeChart.data.push({ x, y });

    // no need to check for an axis cross for the first point
    if (index === 0) {
      activeChart.type = y > 0 ? 'pos' : 'neg';
      return;
    }

    const prevY = processors[DataType.temp](arr[index - 1].main.temp);
    const isChartSwitch = (prevY > 0 && y < 0) || (prevY < 0 && y > 0);

    if (isChartSwitch) {
      // moving to the next chart section
      activeChartIndex += 1;
      chartLines.push({ id: `temp-${activeChartIndex}`, data: [{ x, y }], type: y > 0 ? 'pos' : 'neg' });
    }
  });

  setupChartStartPoint(chartLines, { list, city });

  return chartLines;
}

export { makeTempChartData };
