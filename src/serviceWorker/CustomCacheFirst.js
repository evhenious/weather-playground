import { cacheNames } from 'workbox-core/_private/cacheNames.js';
import { cacheWrapper } from 'workbox-core/_private/cacheWrapper.js';
import { fetchWrapper } from 'workbox-core/_private/fetchWrapper.js';
import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';
import makeLogger from './logger.js';

const logger = makeLogger(process.env.DEBUG_LOG === '1');

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

    let response = await cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins,
    });

    let error;
    if (!response) {
      logger.log('No resp in a cache...');
      // No response found in 'this._cacheName' cache. Will try respond from a network.
      try {
        response = await this._getFromNetwork(request, event);
        this.waitTillCacheUpdated(event, request, response);
        logger.log('Got resp from network!');
      } catch (err) {
        // Unable to get a response from the network
        // Check in the last-chance cache before returning an error
        response = await cacheWrapper.match({
          cacheName: this._emergencyCacheName,
          request,
          event,
          matchOptions: this._matchOptions,
          plugins: [],
        });

        if (response) {
          logger.log('last-chance cache response returns.');
        } else {
          error = err;
          logger.log('... and from network and last-chance-cache.');
        }
      }
    } else {
      // Found a cached response
      logger.log('Cached response found.');

      // Put it in last-chance cache in case
      // there would be no network and user refreshes - to return the last known response all the time
      // until the network appears back.
      const requestData = {
        request,
        response,
      };

      const options = {
        cacheName: this._emergencyCacheName,
        plugins: [],
      };

      this.waitTillCacheUpdated(event, requestData, options);
    }

    if (!response) {
      throw new WorkboxError('no-response', { url: request.url, error });
    }

    return response;
  }

  /**
   * Handles the network and cache part of CacheFirst.
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

    const requestData = {
      request,
      response,
    };

    const options = {
      cacheName: this._cacheName,
      plugins: this._plugins,
    };

    this.waitTillCacheUpdated(event, requestData, options);

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
