import { useEffect, useMemo } from 'react';
import useLocalCachedState from '../custom_hooks/useLocalCachedState';
import { City, ForecastObject } from '../types';
import { makeTempChartData } from '../utils/forecastUtils';
import TempChart from './TemperatureChart';

type ForecastResolver = {
  fetchForecast: (city: City) => Promise<ForecastObject | null>;
};

interface Props {
  city: City;
  forecastResolver: ForecastResolver;
}

const Forecast: React.FC<Props> = ({ city, forecastResolver }) => {
  const [forecast, setForecast] = useLocalCachedState<ForecastObject>('forecast');

  //TODO play aroud conditions
  const tempForecastData = useMemo(() => forecast ? makeTempChartData(forecast) : null, [forecast]);

  useEffect(() => {
    forecastResolver
      .fetchForecast(city)
      .then((data) => setForecast(data || null));
  }, [city, forecastResolver, setForecast]);

  return (
    <>
      {!!tempForecastData ? <TempChart tempData={tempForecastData} /> : false}
    </>
  );
};

export default Forecast;
