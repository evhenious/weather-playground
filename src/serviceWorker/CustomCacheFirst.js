import { cacheNames } from 'workbox-core/_private/cacheNames.js';
import { cacheWrapper } from 'workbox-core/_private/cacheWrapper.js';
import { fetchWrapper } from 'workbox-core/_private/fetchWrapper.js';
import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';
import makeLogger from './logger.js';

const logger = makeLogger('[SERVICE_WORKER]', process.env.REACT_APP_DEBUG_LOG === '1');

/**
 * A cache first strategy custom variant.
 * Does will return cached response even if responce is expired (when no network).
 *
 * If the network request fails, and there is no cache match, this will throw
 * a `WorkboxError` exception.
 *
 * @memberof module:workbox-strategies
 */
class CustomCacheFirst {
  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link module:workbox-core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   */
  constructor(options = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
    this._plugins = options.plugins || [];
    this._fetchOptions = options.fetchOptions;
    this._matchOptions = options.matchOptions;

    this._emergencyCacheName = 'last-chance-weather-cache'; // suppose to not be customized
  }
  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link module:workbox-routing.Router}.
   *
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {Event} [options.event] The event that triggered the request.
   * @return {Promise<Response>}
   */
  async handle({ event, request }) {
    if (typeof request === 'string') {
      request = new Request(request);
    }

    const requestData = {
      request,
      response: null,
    };

    const cacheOptions = {
      cacheName: this._cacheName,
      plugins: this._plugins,
    };

    // Check in the cache, for starters
    let response = await cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins,
    });

    let error;

    if (!response) {
      logger.log('No response in a cache, going to network...');
      try {
        response = await this._getFromNetwork(request, event);
        logger.log('Got fresh data from the network!');
      } catch (err) {
        console.log('No response from the network, checking in the last-chance cache before returning an error...');
        response = await cacheWrapper.match({
          cacheName: this._emergencyCacheName,
          request,
          event,
          matchOptions: this._matchOptions,
          plugins: [],
        });

        if (response) {
          logger.log('Got data from the last-chance cache.');
        } else {
          error = err;
          logger.log('No data in network and both caches...');
        }
      }
    } else {
      logger.log('Cached response found.');
      cacheOptions.cacheName = this._emergencyCacheName;
      cacheOptions.plugins = [];
    }

    // Put the response in the last-chance cache in case there would be no network,
    // and user refreshes the app - to return the last known response all the time,
    // until the network appears back.
    if (response) {
      requestData.response = response;
      this.waitTillCacheUpdated(event, requestData, cacheOptions);
    } else {
      throw new WorkboxError('no-response', { url: request.url, error });
    }

    return response;
  }

  /**
   * Handles the network call for a data.
   *
   * @param {Request} request
   * @param {Event} [event]
   * @return {Promise<Response>}
   *
   * @private
   */
  async _getFromNetwork(request, event) {
    const response = await fetchWrapper.fetch({
      request,
      event,
      fetchOptions: this._fetchOptions,
      plugins: this._plugins,
    });

    return response;
  }

  /**
   * Keep the service worker while we put the request to the cache
   *
   * @param {Event} [event] The event that triggered the request.
   * @param {Object} requestData
   * @param {Request} requestData.request
   * @param {Response} requestData.response
   * @param {Object} options
   * @param {string} options.cacheName
   * @param {any[]} options.plugins
   */
  waitTillCacheUpdated(event, requestData, options) {
    const { request, response } = requestData;

    const responseClone = response.clone();
    const cachePutPromise = cacheWrapper.put({
      request,
      response: responseClone,
      event,
      ...options,
    });

    if (event) {
      try {
        event.waitUntil(cachePutPromise);
        logger.info(`Cache [${options.cacheName}] updated.`);
      } catch (error) {
        logger.warn(`Unable to ensure service worker stays alive when updating cache.`);
      }
    }
  }
}

export { CustomCacheFirst };
