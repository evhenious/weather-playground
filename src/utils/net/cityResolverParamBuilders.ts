const baseReqParams = {
  hateoasMode: false,
  limit: 5,
  offset: 0,
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

export { buildRequest };
