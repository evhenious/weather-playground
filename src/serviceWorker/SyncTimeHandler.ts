import { WorkboxPlugin, CachedResponseWillBeUsedCallbackParam } from 'workbox-core/types.js';

// Need to allow worker to use local storage
const bc = new BroadcastChannel('synctube');

class SyncTimeHandler implements WorkboxPlugin {
  async cachedResponseWillBeUsed(param: CachedResponseWillBeUsedCallbackParam) {
    const { cacheName, cachedResponse } = param;
    console.log('cacheName', cacheName);

    const lastSyncTime = await new Promise<number>((res) => {
      const eventHandler = ({ data }: any) => {
        if (data.command === 'setLastSync') {
          bc.removeEventListener('message', eventHandler);
          res(+data.payload || 0);
        }
      };

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
}

export { SyncTimeHandler };
