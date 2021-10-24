const baseReqParams = {
  hateoasMode: false,
  limit: 5,
  offset: 0,
};

/**
 * Request param builder for local dev app requests to resolve city name.
 * Vercel does not want to execte api lambda on local machine so I had to
 * separate Dev and Prod ways to make request to city resolver API.
 * Maybe a bit not clear, but Strategy :)
 */
const buildLocalRequest = (cityNamePart: string): [string, { [key: string]: string | number | boolean }] => {
  const reqParams = {
    ...baseReqParams,
    namePrefix: cityNamePart,
  };

  return ['/v1/geo/cities', reqParams];
};

/**
 * Request param builder for deployed app requests to resolve city name
 */
const buildRequest = (cityNamePart: string): [string, { [key: string]: string }] => {
  const geoReqParams = {
    ...baseReqParams,
    namePrefix: cityNamePart,
  };

  const reqParams = {
    url: '/v1/geo/cities',
    params: JSON.stringify(geoReqParams),
  };

  return ['/geo', reqParams];
};

export { buildLocalRequest, buildRequest };
