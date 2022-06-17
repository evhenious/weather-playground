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

class SyncTimeHandler implements WorkboxPlugin {
  constructor(private cacheNameToWatch: string) {}

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

    // do not process any cache other than the one we're watching
    if (cacheName !== this.cacheNameToWatch) {
      return cachedResponse;
    }

    const lastSyncTime = await broadcastHelper.getlastSyncTime();
    const isCacheTooOld = (Date.now() - lastSyncTime) / (1000 * 3600) >= 2; // older than 2 hours -> refresh on open
    logger.info('Last sync time we have', lastSyncTime);
    if (isCacheTooOld) {
      logger.info('Old cache, going to network');
      return null; // means we need to go to network and fetch fresh data
    }

    return cachedResponse;
  }

  /**
   * If our cache was successfully updated, we save the timestamp to be able to check if cache is old later
   *
   * @param param
   *
   * @returns {Promise<void>}
   */
  async cacheDidUpdate(param: CacheDidUpdateCallbackParam) {
    const { cacheName } = param;

    // do not process any cache other than the one we're watching
    if (cacheName !== this.cacheNameToWatch) {
      return;
    }

    broadcastHelper.saveCurrentsyncTime();
  }
}

export { SyncTimeHandler };
