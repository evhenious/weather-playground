import { IconType } from 'react-icons';
import {
  WiDaySunny,
  WiNightClear,
  WiNa,
  WiDayCloudy,
  WiNightCloudy,
  WiCloudy,
  WiCloud,
  WiDayShowers,
  WiNightShowers,
  WiDayRain,
  WiNightRain,
  WiDayThunderstorm,
  WiNightThunderstorm,
  WiDaySnow,
  WiNightSnow,
  WiDayHaze,
  WiNightFog,
  WiHorizonAlt,
  WiWindy,
  WiThermometer
} from 'react-icons/wi';

const iconMap: { [key: string]: IconType } = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': WiDayCloudy,
  '02n': WiNightCloudy,
  '03d': WiCloud,
  '03n': WiCloud,
  '04d': WiCloudy,
  '04n': WiCloudy,
  '09d': WiDayShowers,
  '09n': WiNightShowers,
  '10d': WiDayRain,
  '10n': WiNightRain,
  '11d': WiDayThunderstorm,
  '11n': WiNightThunderstorm,
  '13d': WiDaySnow,
  '13n': WiNightSnow,
  '50d': WiDayHaze,
  '50n': WiNightFog,
  'sunlight': WiHorizonAlt,
  'wind': WiWindy,
  'thermo': WiThermometer
};

const getIcon = (name: string) => {
  return iconMap[name] || WiNa;
};

export { getIcon };
