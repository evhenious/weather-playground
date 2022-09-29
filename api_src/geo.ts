import http from 'http';
import { GeoDbRequestParams } from "./types";

const { GEO_DB_BASE_URL = '' } = process.env;

async function processRequest(req, res) {
  const { url: apiUrl, params = '' } = req.query;

  const parsedParams: GeoDbRequestParams = JSON.parse(params);

  const reqParams = new URLSearchParams();
  Object.entries(parsedParams).forEach(([key, val]) => {
    reqParams.set(key, val as string);
  });

  try {
    const resp = await getGeoData(apiUrl, reqParams);
    res.json(resp);
  } catch (error) {
    // error is a string here, as thrown in getGeoData
    res.status(500).json({ error });
  }
}

/**
 * Calls GeoDB endpoint. Generic thing.
 */
function getGeoData(endpoint = '', params: URLSearchParams) {
  const url = `${GEO_DB_BASE_URL}${endpoint}?${params}`;
  console.log('/api/geo: Calling:', url);

  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (e) {
            console.error(e.message);
            reject('Error parsing GeoDB response');
          }
        });
      })
      .on('error', (err) => {
        console.error('Error: ', err.message);
        reject('Cannot get GeoDB data');
      });
  });
}

module.exports = processRequest;
