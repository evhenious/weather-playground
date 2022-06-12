import {
  WorkboxPlugin,
  CachedResponseWillBeUsedCallbackParam,
  CacheDidUpdateCallbackParam,
} from 'workbox-core/types.js';

// Need to allow worker to use local storage
const bc = new BroadcastChannel('synctube');

class SyncTimeHandler implements WorkboxPlugin {
  constructor(private cacheNameToWatch: string) {}

  async cachedResponseWillBeUsed(param: CachedResponseWillBeUsedCallbackParam) {
    const { cacheName, cachedResponse } = param;

    console.log('cacheName', cacheName);
    if (cacheName !== this.cacheNameToWatch) {
      return cachedResponse;
    }

    const lastSyncTime = await new Promise<number>((res) => {
      const eventHandler = ({ data }: any) => {
        if (data.command === 'setLastSync') {
          bc.removeEventListener('message', eventHandler);
          res(+data.payload || 0);
        }
      };

      console.log('Gettig last sync time');
      bc.addEventListener('message', eventHandler);
      bc.postMessage({ command: 'getLastSync' });
    });

    // const isCacheTooOld = (Date.now() - this.#lastSyncTime) / (1000 * 3600) >= 2;
    console.info('last sync time', lastSyncTime);
    const isCacheTooOld = (Date.now() - lastSyncTime) / (1000 * 60) >= 1;
    if (isCacheTooOld) {
      console.log('Old cache, going to net');
      return null; // means we need to go to network and fetch fresh data
    }

    return cachedResponse;
  }

  async cacheDidUpdate(param: CacheDidUpdateCallbackParam) {
    const { cacheName } = param;

    console.log('cacheName', cacheName);
    if (cacheName !== this.cacheNameToWatch) {
      return;
    }

    console.log('Saving last sync time');
    bc.postMessage({ command: 'saveLastSync', payload: Date.now() });
  }
}

export { SyncTimeHandler };
