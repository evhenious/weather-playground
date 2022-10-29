import { DateTime } from 'luxon';
import { inRange } from 'lodash';

export enum DataType {
  date = 'date',
  direction = 'dir',
  distance = 'dist',
  humidity = 'hum',
  pressure = 'press',
  temp = 'temp',
  time = 'time',
  timespan = 'timesp',
  speed = 'speed'
}

const roundValue = (value: number) => Math.round(value);

type CompassSector = [number, number];
const getSector = (deg: number, angle = 45): CompassSector => [deg - angle / 2, deg + angle / 2];

const mapToCompass = (deg: number) => {
  if (inRange(deg, ...getSector(45))) return 'NE';
  if (inRange(deg, ...getSector(90))) return 'E';
  if (inRange(deg, ...getSector(135))) return 'SE';
  if (inRange(deg, ...getSector(180))) return 'S';
  if (inRange(deg, ...getSector(225))) return 'SW';
  if (inRange(deg, ...getSector(270))) return 'W';
  if (inRange(deg, ...getSector(315))) return 'NW';
  return 'N;'
}

export const processors = {
  /** @param data timestamp in milliseconds */
  [DataType.date]: (data: number) => DateTime.fromMillis(data).toFormat('EEE, d MMM yyyy'),
  [DataType.direction]: mapToCompass,
  [DataType.distance]: (data: number) => new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(data),
  [DataType.humidity]: (data: number) => data,
  [DataType.pressure]: (data: number) => data / 1000,
  [DataType.temp]: roundValue,
  /** @param data timestamp in seconds */
  [DataType.time]: (data: number) => DateTime.fromSeconds(data).toFormat('hh:mm'),
  [DataType.timespan]: (seconds: number) => (seconds / 60 / 60).toFixed(1),
  [DataType.speed]: roundValue,
};

export const additionals: { [key: string]: string } = {
  [DataType.distance]: ' m',
  [DataType.humidity]: '%',
  [DataType.pressure]: ' mBar',
  [DataType.temp]: '°C',
  [DataType.timespan]: ' hrs',
  [DataType.speed]: ' m/s'
};