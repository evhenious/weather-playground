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
