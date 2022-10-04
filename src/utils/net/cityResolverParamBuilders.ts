import { GeoParamBuilder } from '../../types';

const GEODB_ENDPOINTS = {
  getCity: process.env.REACT_APP_GEO_EP_GET_CITY || '',
};

const baseReqParams = {
  hateoasMode: false,
  limit: 5,
  offset: 0,
};

/**
 * Request param builder to resolve city name
 */
const buildRequest: GeoParamBuilder = (cityNamePart) => {
  const geoReqParams = {
    ...baseReqParams,
    namePrefix: cityNamePart,
  };

  const reqParams = {
    url: GEODB_ENDPOINTS.getCity,
    params: JSON.stringify(geoReqParams),
  };

  return ['/geo', reqParams];
};

export { buildRequest };
