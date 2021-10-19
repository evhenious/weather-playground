const http = require('http');

const GEO_DB_BASE_URL = 'http://geodb-free-service.wirefreethought.com';

async function processRequest(req, res) {
  const { url: apiUrl, params = {} } = req.query;

  const parsedParams = JSON.parse(params);

  const reqParams = Object.keys(parsedParams).reduce((acc, key) => {
    const separator = acc.length ? '&' : '?';
    return (acc += `${separator}${key}=${parsedParams[key]}`);
  }, '');

  try {
    const resp = await getGeoData(apiUrl, reqParams);
    res.json(resp);
  } catch (error) {
    res.status(400).json({ error });
  }
}

function getGeoData(apiUrl, params) {
  const url = `${GEO_DB_BASE_URL}${apiUrl}${params}`;
  console.log('Calling:', url);

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
