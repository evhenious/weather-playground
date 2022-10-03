import { useEffect, useMemo } from 'react';
import useLocalCachedState from '../custom_hooks/useLocalCachedState';
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
  const [forecast, setForecast] = useLocalCachedState<ForecastDataList>('forecast');

  //TODO play aroud conditions
  const tempForecastData = useMemo(() => makeTempChartData(forecast || []), [forecast]);

  useEffect(() => {
    forecastResolver
      .fetchForecast(city)
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => setForecast(data?.list || null));
  }, [city, forecastResolver, setForecast]);

  return (
    <>
      <TempChart tempData={tempForecastData} />
    </>
  );
};

export default Forecast;
