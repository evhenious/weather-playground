export enum DataType {
  date = 'date',
  distance = 'dist',
  humidity = 'hum',
  temp = 'temp',
  time = 'time',
  pressure = 'press'
}

const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' } as const;
const timeOptions = { hour: '2-digit', minute: '2-digit' } as const;

export const processors = {
  [DataType.date]: (data: number) => new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date(data)),
  [DataType.distance]: (data: number) => new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(data),
  [DataType.humidity]: (data: number) => data,
  [DataType.temp]: (data: number) => Math.round(data),
  [DataType.time]: (data: number) => new Intl.DateTimeFormat('en-GB', timeOptions).format(new Date(data * 1000)),
  [DataType.pressure]: (data: number) => data / 1000,
};

export const additionals = {
  [DataType.date]: '',
  [DataType.distance]: ' m',
  [DataType.humidity]: '%',
  [DataType.temp]: '°C',
  [DataType.time]: '',
  [DataType.pressure]: ' mBar',
};