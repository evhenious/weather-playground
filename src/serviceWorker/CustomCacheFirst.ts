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
  private _cacheName: string;
  private _emergencyCacheName: string;

  /**
   * @param {Object} options
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
  constructor(options: StrategyOptions = {}) {
    super(options);

    this._cacheName = cacheNames.getRuntimeName(options.cacheName);
    this._emergencyCacheName = `last-chance-${options.cacheName}`; // suppose to not be customized
  }

  /**
   * Main strategy handler used by workbox v6
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler
   */
  async _handle(request: Request, handler: StrategyHandler) {
    // Check in the first-step cache, for starters
    let response = await handler.cacheMatch(request);
    logger.log('First cache hit:', !!response);

    let error;
    let isFromEmergency = false;
    if (response) {
      logger.log('Cached response found, need to update last-chance-cache.');
      this.cacheName = this._emergencyCacheName;
    } else {
      logger.log(`No response in a cache [${this.cacheName}], going to network...`);

      try {
        response = await handler.fetch(request);
        logger.log(`Got fresh data for [${this.cacheName}] from the network!`);
      } catch (err) {
        this.cacheName = this._emergencyCacheName;
        logger.info(`No response from the network, checking in last-chance cache [${this.cacheName}] cache...`);

        response = await handler.cacheMatch(request);

        let cacheHitMsg = `Got data from the last-chance cache [${this.cacheName}]`;
        isFromEmergency = true;
        if (!response) {
          error = err;
          cacheHitMsg = 'No data in network and both caches...';
        }
        logger.log(cacheHitMsg);
      }
    }

    if (!response) {
      throw new WorkboxError('no-response', { url: request.url, error });
    }

    if (!isFromEmergency) {
      handler.waitUntil(
        Promise.resolve().then(async () => {
          if (this.cacheName === this._emergencyCacheName) {
            (handler as any)._plugins = []; // 'any' is intentional
          }

          logger.log(`Updating cache [${this.cacheName}]`);
          await handler.cachePut(request, (response as any).clone()); // 'any' is intentional

          if (this.cacheName === this._emergencyCacheName) {
            (handler as any)._plugins = [...this.plugins];  // 'any' is intentional
            this.cacheName = this._cacheName;
          }
        })
      );
    }

    return response;
  }
}

export { CustomCacheFirst };
