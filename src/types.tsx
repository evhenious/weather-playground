export type City = {
  city: string;
  country: string;
  countryCode: string;
  name: string;
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
  }[]
};

export type WeatherResponse = {
  data: Weather;
};
