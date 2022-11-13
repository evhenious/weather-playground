import { cacheNames } from 'workbox-core/_private/cacheNames.js';
import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';
import { Strategy, StrategyOptions, StrategyHandler } from 'workbox-strategies';
import makeLogger from './logger.js';

const logger = makeLogger('[SERVICE_WORKER|CUSTOM_CACHE]', process.env.REACT_APP_DEBUG_LOG === '1');

/**
 * A cache-first strategy, custom variant.
 * Will return cached response even if responce is expired (when no network).
 *
 * If the network request fails, and there is no cache match, this will throw a `WorkboxError` exception.
 *
 * @memberof module:workbox-strategies
 */
class CustomCacheFirst extends Strategy {
  /**
   * @param {StrategyOptions} options
   * @param {string} options.cacheName Cache name to store and retrieve requests. Defaults to cache names provided by
   * [workbox-core]{@link module:workbox-core.cacheNames}.
   *
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   *
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   *
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(options = {}) {
    super(options);

    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
    this._emergencyCacheName = `last-chance-${options.cacheName}`; // suppose to not be customized
  }

  /**
   * Main strategy handler used by workbox v6
   *
   * cache -> miss -> network -> OK -> cache put -> responce
   * cache -> hit -> last-chance cache put -> responce
   * cache -> miss -> network -> NO -> last-chance cache -> hit -> responce
   * cache -> miss -> network -> NO -> last-chance cache -> miss -> error
   *
   * @param {Request|string} request A request to run this strategy for.
   * @param {StrategyHandler} handler
   */
  async _handle(request, handler) {
    // Check in the first-step cache
    let error;
    let response = await handler.cacheMatch(request);
    let isLastChanceCacheHit = false;

    if (response) {
      logger.log(`First cache hit for [${this.cacheName}], need to update [${this._emergencyCacheName}].`);
      this.cacheName = this._emergencyCacheName;
    } else {
      logger.log(`No response in [${this.cacheName}], going to network...`);

      try {
        response = await handler.fetch(request);
        logger.log(`Got fresh data for [${this.cacheName}] from the network!`);
      } catch (err) {
        this.cacheName = this._emergencyCacheName;
        logger.info(`No response from the network, checking in [${this.cacheName}] cache...`);

        response = await handler.cacheMatch(request);

        let cacheHitMsg = `Got data from [${this._emergencyCacheName}]`;
        isLastChanceCacheHit = true;
        if (!response) {
          error = err;
          cacheHitMsg = 'No data in network and both caches. Throwing error';
        }

        logger.log(cacheHitMsg);
      }
    }

    if (!response) {
      throw new WorkboxError('no-response', { url: request.url, error });
    }

    // we are here - means a _response_ is not empty
    if (!isLastChanceCacheHit) {
      handler.waitUntil(
        Promise.resolve().then(async () => {

          // last-chance cache will be updated on first hit of successful main cache hit
          if (this.cacheName === this._emergencyCacheName) {
            handler._plugins = [];
          }

          logger.log(`Updating cache [${this.cacheName}]`);
          await handler.cachePut(request, response.clone());

          if (this.cacheName === this._emergencyCacheName) {
            handler._plugins = [...this.plugins];
            this.cacheName = this._cacheName;
          }
        })
      );
    }

    return response;
  }
}

export { CustomCacheFirst };
