import { ForecastDataList, TempForecastData } from '../types';
import { DataType, processors } from './formatUtils';

/**
 * Transforms forecast data list into x-y values used to draw temp chart
 */
function makeTempChartData(data: ForecastDataList) {
  const tempLines: TempForecastData = [
    { id: 'positive_c', data: [] },
    { id: 'negative_c', data: [] },
  ];

  data.forEach(({ main, dt_txt }) => {
    const { temp } = main;
    const x = dt_txt;
    const y = processors[DataType.temp](temp);

    if (temp > 0) {
      tempLines[0].data.push({ x, y });
    } else {
      tempLines[1].data.push({ x, y });
    }
  });

  return tempLines;
}

export { makeTempChartData };
