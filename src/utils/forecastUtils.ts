import { DateTime } from 'luxon';
import { ForecastObject, TempForecastData } from '../types';
import { DataType, processors } from './formatUtils';

/**
 * Inserts custom date point as a first chart point if there is not cached data and forecast starts ahead of NOW
 */
const setupChartStartPoint = ([posLine, negLine]: TempForecastData, { list, city }: ForecastObject) => {
  const firstForecastPoint = list[0];
  const lastForecastPoint = list[list.length - 1];
  const processedLastValue = processors[DataType.temp](lastForecastPoint.main.temp)

  if (firstForecastPoint.dt + city.timezone / 60 > Math.round(Date.now() / 1000)) {
    const prevDatePoint = DateTime.fromSeconds(firstForecastPoint.dt, { zone: 'UTC' })
      .minus({ hours: 3 }) //! not a timeshift, just minus 3hrs
      .toFormat('yyyy-MM-dd TT');

    const customChartPoint = { x: prevDatePoint, y: processors[DataType.temp](firstForecastPoint.main.temp) };
    (customChartPoint.y > 0 ? posLine : negLine).data.unshift(customChartPoint);
    (processedLastValue > 0 ? posLine : negLine).data.pop(); // keeping one spare forecast step
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

    if (index === 0) {
      activeChart.type = y > 0 ? 'pos' : 'neg';
      return;
    }

    const prevY = processors[DataType.temp](arr[index - 1].main.temp);
    const isChartSwitch = (prevY > 0 && y < 0) || (prevY < 0 && y > 0);

    if (isChartSwitch) {
      activeChartIndex += 1;
      chartLines.push({ id: `temp-${activeChartIndex}`, data: [], type: y > 0 ? 'pos' : 'neg' });
      chartLines[activeChartIndex].data.push({ x, y });
    }
  });

  // setupChartStartPoint(chartLines, { list, city });
  console.log(chartLines)

  return chartLines;
}

export { makeTempChartData };
