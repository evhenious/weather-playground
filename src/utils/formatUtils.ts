export enum DataType {
  date = 'date',
  distance = 'dist',
  humidity = 'hum',
  pressure = 'press',
  temp = 'temp',
  time = 'time',
  speed = 'speed'
}

const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' } as const;
const timeOptions = { hour: '2-digit', minute: '2-digit' } as const;

export const processors = {
  [DataType.date]: (data: number) => new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date(data)),
  [DataType.distance]: (data: number) => new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(data),
  [DataType.humidity]: (data: number) => data,
  [DataType.pressure]: (data: number) => data / 1000,
  [DataType.temp]: (data: number) => Math.round(data),
  [DataType.time]: (data: number) => new Intl.DateTimeFormat('en-GB', timeOptions).format(new Date(data * 1000)),
  [DataType.speed]: (data: number) => Math.round(data),
};

export const additionals = {
  [DataType.date]: '',
  [DataType.distance]: ' m',
  [DataType.humidity]: '%',
  [DataType.pressure]: ' mBar',
  [DataType.temp]: '°C',
  [DataType.time]: '',
  [DataType.speed]: ' m/s'
};