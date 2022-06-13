import {
  CacheDidUpdateCallbackParam,
  CachedResponseWillBeUsedCallbackParam,
  WorkboxPlugin
} from 'workbox-core/types.js';
import { BroadcastData, BROADCAST_COMMANDS, makeGetSyncTimeMsg, makeSaveSyncTimeMsg } from '../globals';
import makeLogger from './logger';

const logger = makeLogger('[SERVICE_WORKER|SYNC_TIME_HANDLER]', process.env.REACT_APP_DEBUG_LOG === '1');

// Need to allow worker to use local storage
const bc = new BroadcastChannel('synctube');

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

    const lastSyncTime = await new Promise<number>((res) => {
      const eventHandler = ({ data }: { data: BroadcastData }) => {
        if (data.command === BROADCAST_COMMANDS.setLastSync) {
          bc.removeEventListener('message', eventHandler);
          res(+(data?.payload || 0));
        }
      };

      logger.info('Gettig last cache sync time...');
      bc.addEventListener('message', eventHandler);
      bc.postMessage(makeGetSyncTimeMsg());
    });

    const isCacheTooOld = (Date.now() - lastSyncTime) / (1000 * 3600) >= 2;
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

    logger.log('Saving last sync time...');
    bc.postMessage(makeSaveSyncTimeMsg());
  }
}

export { SyncTimeHandler };
