import { DateTime } from 'luxon';
import { ForecastObject, TempForecastData } from '../types';
import { DataType, processors } from './formatUtils';

/**
 * Inserts custom date point as a first chart point if there is not cached data and forecast starts ahead of NOW
 */
const setupChartStartPoint = ([posLine, negLine]: TempForecastData, { list, city }: ForecastObject) => {
  const firstForecastPoint = list[0];

  if (firstForecastPoint.dt + city.timezone / 60 > Math.round(Date.now() / 1000)) {
    const prevDatePoint = DateTime.fromSeconds(firstForecastPoint.dt, { zone: 'UTC' })
      .minus({ hours: 3 })
      .toFormat('yyyy-MM-dd TT');

    const customChartPoint = { x: prevDatePoint, y: processors[DataType.temp](firstForecastPoint.main.temp) };
    (firstForecastPoint.main.temp > 0 ? posLine : negLine).data.unshift(customChartPoint);
    (firstForecastPoint.main.temp > 0 ? posLine : negLine).data.pop(); // keeping one spare forecast step
  }
};

/**
 * Transforms forecast data list into x-y values used to draw temp chart
 */
function makeTempChartData({ list, city }: ForecastObject) {
  const chartLines: TempForecastData = [
    { id: 'positive_c', data: [] },
    { id: 'negative_c', data: [] },
  ];

  list.forEach(({ main, dt_txt }) => {
    const { temp } = main;
    const x = dt_txt;
    const y = processors[DataType.temp](temp);

    (temp > 0 ? chartLines[0] : chartLines[1]).data.push({ x, y });
  });

  setupChartStartPoint(chartLines, { list, city });

  return chartLines;
}

export { makeTempChartData };
