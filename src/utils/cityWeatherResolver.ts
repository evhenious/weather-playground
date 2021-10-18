import axios from 'axios';
import { City } from '../types';

const fetcher = axios.create({
  baseURL: 'https://api.openweathermap.org',
});

let API_KEY = '';

const setApiKey = (key: string) => {
  API_KEY = key;
};

// ex. api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const fetchCityWeather = async (city: City) => {
  const params = {
    appid: API_KEY,
    q: `${city.name},${city.countryCode}`,
    units: 'metric',
  };

  let resp = '';

  try {
    resp = await fetcher.get('/data/2.5/weather', { params });
  } catch (err) {
    console.error('Cannot fetch city weather', err);
  }

  return resp;
};

export { fetchCityWeather, setApiKey };

/*
const resp = {
  coord: { lon: 24.0232, lat: 49.8383 },
  weather: [{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n' }],
  base: 'stations',
  main: { temp: 7.17, feels_like: 5.11, temp_min: 6.4, temp_max: 7.21, pressure: 1025, humidity: 98 },
  visibility: 6000,
  wind: { speed: 3, deg: 290 },
  clouds: { all: 90 },
  dt: 1634581248,
  sys: { type: 1, id: 8909, country: 'UA', sunrise: 1634532607, sunset: 1634570859 },
  timezone: 10800,
  id: 702550,
  name: 'Lviv',
  cod: 200,
};
*/