export type City = {
  id: number;
  city: string;
  country: string;
  countryCode: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
};

export type CityResponse = {
  data: {
    data: City[];
  };
};

export type Weather = {
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  visibility: number;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
};

export interface GeoParamBuilder {
  (cityNamePart: string): [string, { url: string; params: string }];
}

export type WeatherResponse = {
  data: Weather;
};

export type ForecastResponse = {
  data: ForecastObject;
};

export type ForecastObject = {
  list: ForecastDataList;
  city: {
    timezone: number;
  };
};

export type ForecastDataList = {
  main: {
    temp: number;
  };
  dt: number;
  dt_txt: string;
}[];

type TempChartPoint = {
  x: string;
  y: number;
};

export type TempForecastData = {
  id: string;
  type: 'pos' | 'neg',
  data: TempChartPoint[];
}[];
