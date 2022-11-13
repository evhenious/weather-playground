import {
  CacheDidUpdateCallbackParam,
  CachedResponseWillBeUsedCallbackParam,
  WorkboxPlugin
} from 'workbox-core/types.js';
import { BC_SYNC_CHANNEL } from '../globals';
import { BroadcastHelper } from './BroadcastHelper';
import makeLogger from './logger';

const logger = makeLogger('[SERVICE_WORKER|SYNC_TIME_HANDLER]', process.env.REACT_APP_DEBUG_LOG === '1');

// Need to allow worker to use local storage
const broadcastHelper = new BroadcastHelper(BC_SYNC_CHANNEL);

type CacheConfig = {
  name: string;
  hoursTTL: number;
};

class SyncTimeHandler implements WorkboxPlugin {
  constructor(private cacheToWatch: CacheConfig) {}

  /**
   * Checking if cached response is too old for us and if we need immediately refresh from network.
   * Method will be triggered before returning cached response.
   *
   * @param param
   *
   * @returns {Promise<Response|null|undeined>}
   */
  async cachedResponseWillBeUsed(param: CachedResponseWillBeUsedCallbackParam) {
    const { cacheName, cachedResponse } = param;

    // do not process any cache other than the ones we're watching for
    if (cacheName !== this.cacheToWatch.name) {
      return cachedResponse;
    }

    const lastSyncTime = await broadcastHelper.getLastSyncTime(cacheName);
    logger.info(`Last sync time we have for [${cacheName}]:`, lastSyncTime);
    const isCacheTooOld = (Date.now() - lastSyncTime) / (1000 * 3600) >= this.cacheToWatch.hoursTTL; // older than TTL hours -> refresh on open

    if (isCacheTooOld) {
      logger.info(`[${cacheName}] old cache, going to network...`);
      return null; // means we need to go to network and fetch fresh data
    }

    return cachedResponse;
  }

  /**
   * If our cache was successfully updated, we save the timestamp to be able to check if cache is expired in later calls
   *
   * @param param
   *
   * @returns {Promise<void>}
   */
  async cacheDidUpdate(param: CacheDidUpdateCallbackParam) {
    const { cacheName } = param;

    // do not process any cache other than the one we're watching
    if (cacheName !== this.cacheToWatch.name) {
      return;
    }

    broadcastHelper.saveSyncTime(cacheName);
  }
}

export { SyncTimeHandler };
