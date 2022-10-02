import { useEffect, useMemo, useState } from 'react';
import { City, ForecastDataList } from '../types';
import { makeTempChartData } from '../utils/forecastUtils';
import TempChart from './TemperatureChart';

type ForecastResolver = {
  fetchForecast: (city: City) => Promise<{ list: ForecastDataList } | null>;
};

interface Props {
  city: City;
  forecastResolver: ForecastResolver;
}

const Forecast: React.FC<Props> = ({ city, forecastResolver }) => {
  const [forecast, setForecast] = useState<ForecastDataList>([]);

  //TODO play aroud conditions
  const tempForecastData = useMemo(() => makeTempChartData(forecast), [forecast]);

  useEffect(() => {
    forecastResolver
      .fetchForecast(city)
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => setForecast(data?.list || []));
  }, [city, forecastResolver]);

  return (
    <>
      <TempChart tempData={tempForecastData} />
    </>
  );
};

export default Forecast;
