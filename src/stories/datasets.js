const city = {
  id: 702550,
  name: 'Lviv',
  coord: {
    lat: 49.8425,
    lon: 24.0322,
  },
  country: 'UA',
  population: 15000,
  timezone: 7200, // the one thing used by chart
  sunrise: 1668923028,
  sunset: 1668954925,
};

const listPositive = [
  {
    dt: 1668978000,
    main: {
      temp: 2.3,
      feels_like: -2.18,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0.22,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.84,
      deg: 187,
      gust: 3.44,
    },
    visibility: 10000,
    pop: 0,
    dt_txt: '2022-11-20 21:00:00',
  },
  {
    dt: 1668988800,
    main: {
      temp: 3,
      feels_like: -2.13,
      pressure: 1012,
      humidity: 96,
      temp_kf: 0.09,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.75,
      deg: 204,
      gust: 2.34,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 00:00:00',
  },
  {
    dt: 1668999600,
    main: {
      temp: 5,
      feels_like: -0.52,
      pressure: 1012,
      humidity: 95,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.09,
      deg: 202,
      gust: 1.07,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 03:00:00',
  },
  {
    dt: 1669010400,
    main: {
      temp: 5,
      feels_like: -0.85,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1,
      deg: 157,
      gust: 1.16,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 06:00:00',
  },
  {
    dt: 1669021200,
    main: {
      temp: 4,
      feels_like: -2.36,
      pressure: 1011,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 2.13,
      deg: 139,
      gust: 2.76,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 09:00:00',
  },
  {
    dt: 1669032000,
    main: {
      temp: 4,
      feels_like: 1.1,
      pressure: 1010,
      humidity: 91,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1.17,
      deg: 121,
      gust: 1.54,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 12:00:00',
  },
  {
    dt: 1669042800,
    main: {
      temp: 2.5,
      feels_like: -1.3,
      pressure: 1009,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.45,
      deg: 101,
      gust: 1.75,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 15:00:00',
  },
  {
    dt: 1669053600,
    main: {
      temp: 1.36,
      feels_like: 0.36,
      pressure: 1009,
      humidity: 90,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 0.98,
      deg: 147,
      gust: 0.98,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 18:00:00',
  },
];

const listPosNeg = [
  {
    dt: 1668978000,
    main: {
      temp: 2.3,
      feels_like: -2.18,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0.22,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 2.84,
      deg: 187,
      gust: 3.44,
    },
    visibility: 10000,
    pop: 0,
    dt_txt: '2022-11-20 21:00:00',
  },
  {
    dt: 1668988800,
    main: {
      temp: 1.3,
      feels_like: -2.13,
      pressure: 1012,
      humidity: 96,
      temp_kf: 0.09,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.75,
      deg: 204,
      gust: 2.34,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 00:00:00',
  },
  {
    dt: 1668999600,
    main: {
      temp: -2.1,
      feels_like: -0.52,
      pressure: 1012,
      humidity: 95,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.09,
      deg: 202,
      gust: 1.07,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 03:00:00',
  },
  {
    dt: 1669010400,
    main: {
      temp: -3.55,
      feels_like: -0.85,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1,
      deg: 157,
      gust: 1.16,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 06:00:00',
  },
  {
    dt: 1669021200,
    main: {
      temp: -2,
      feels_like: -2.36,
      pressure: 1011,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 2.13,
      deg: 139,
      gust: 2.76,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 09:00:00',
  },
  {
    dt: 1669032000,
    main: {
      temp: -3,
      feels_like: 1.1,
      pressure: 1010,
      humidity: 91,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1.17,
      deg: 121,
      gust: 1.54,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 12:00:00',
  },
  {
    dt: 1669042800,
    main: {
      temp: -4.5,
      feels_like: -1.3,
      pressure: 1009,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.45,
      deg: 101,
      gust: 1.75,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 15:00:00',
  },
  {
    dt: 1669053600,
    main: {
      temp: -4.36,
      feels_like: 0.36,
      pressure: 1009,
      humidity: 90,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 0.98,
      deg: 147,
      gust: 0.98,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 18:00:00',
  },
];

const listPosNegPos = [
  {
    dt: 1668978000,
    main: {
      temp: 2.3,
      feels_like: -2.18,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0.22,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 2.84,
      deg: 187,
      gust: 3.44,
    },
    visibility: 10000,
    pop: 0,
    dt_txt: '2022-11-20 21:00:00',
  },
  {
    dt: 1668988800,
    main: {
      temp: 1.3,
      feels_like: -2.13,
      pressure: 1012,
      humidity: 96,
      temp_kf: 0.09,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.75,
      deg: 204,
      gust: 2.34,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 00:00:00',
  },
  {
    dt: 1668999600,
    main: {
      temp: -2.1,
      feels_like: -0.52,
      pressure: 1012,
      humidity: 95,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.09,
      deg: 202,
      gust: 1.07,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 03:00:00',
  },
  {
    dt: 1669010400,
    main: {
      temp: -3.55,
      feels_like: -0.85,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1,
      deg: 157,
      gust: 1.16,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 06:00:00',
  },
  {
    dt: 1669021200,
    main: {
      temp: -2,
      feels_like: -2.36,
      pressure: 1011,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 2.13,
      deg: 139,
      gust: 2.76,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 09:00:00',
  },
  {
    dt: 1669032000,
    main: {
      temp: -1,
      feels_like: 1.1,
      pressure: 1010,
      humidity: 91,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1.17,
      deg: 121,
      gust: 1.54,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 12:00:00',
  },
  {
    dt: 1669042800,
    main: {
      temp: 1,
      feels_like: -1.3,
      pressure: 1009,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.45,
      deg: 101,
      gust: 1.75,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 15:00:00',
  },
  {
    dt: 1669053600,
    main: {
      temp: 3,
      feels_like: 0.36,
      pressure: 1009,
      humidity: 90,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 0.98,
      deg: 147,
      gust: 0.98,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 18:00:00',
  },
];

const listNegative = [
  {
    dt: 1668978000,
    main: {
      temp: -2.3,
      feels_like: -2.18,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0.22,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 2.84,
      deg: 187,
      gust: 3.44,
    },
    visibility: 10000,
    pop: 0,
    dt_txt: '2022-11-20 21:00:00',
  },
  {
    dt: 1668988800,
    main: {
      temp: -1.3,
      feels_like: -2.13,
      pressure: 1012,
      humidity: 96,
      temp_kf: 0.09,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.75,
      deg: 204,
      gust: 2.34,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 00:00:00',
  },
  {
    dt: 1668999600,
    main: {
      temp: -2.1,
      feels_like: -0.52,
      pressure: 1012,
      humidity: 95,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.09,
      deg: 202,
      gust: 1.07,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 03:00:00',
  },
  {
    dt: 1669010400,
    main: {
      temp: -3.55,
      feels_like: -0.85,
      pressure: 1012,
      humidity: 97,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1,
      deg: 157,
      gust: 1.16,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 06:00:00',
  },
  {
    dt: 1669021200,
    main: {
      temp: -2,
      feels_like: -2.36,
      pressure: 1011,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 2.13,
      deg: 139,
      gust: 2.76,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 09:00:00',
  },
  {
    dt: 1669032000,
    main: {
      temp: -1,
      feels_like: 1.1,
      pressure: 1010,
      humidity: 91,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04d',
      },
    ],
    wind: {
      speed: 1.17,
      deg: 121,
      gust: 1.54,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 12:00:00',
  },
  {
    dt: 1669042800,
    main: {
      temp: -5,
      feels_like: -1.3,
      pressure: 1009,
      humidity: 92,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 1.45,
      deg: 101,
      gust: 1.75,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 15:00:00',
  },
  {
    dt: 1669053600,
    main: {
      temp: -3,
      feels_like: 0.36,
      pressure: 1009,
      humidity: 90,
      temp_kf: 0,
    },
    weather: [
      {
        id: 804,
        main: 'Clouds',
        description: 'overcast clouds',
        icon: '04n',
      },
    ],
    wind: {
      speed: 0.98,
      deg: 147,
      gust: 0.98,
    },
    visibility: 10000,
    dt_txt: '2022-11-21 18:00:00',
  },
];

export { city, listPositive, listPosNeg, listPosNegPos, listNegative };
