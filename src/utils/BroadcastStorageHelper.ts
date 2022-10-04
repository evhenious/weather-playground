import { BroadcastData, BROADCAST_COMMANDS, CacheSyncTimeMsg, responseLastSyncTime } from '../globals';
import { dataStorage } from './storage/dataStorage';

const syncAt = 'lastSyncAt';

/**
 * Simple payload typeguard
 */
const isCacheSyncMsg = (payload: any): payload is CacheSyncTimeMsg => {
  return !!(payload as CacheSyncTimeMsg)?.cacheName;
}

class BroadcastStorageHelper {
  private bc: BroadcastChannel;

  constructor(channelName: string) {
    this.bc = new BroadcastChannel(channelName);
  }

  /**
   * Works from **main page** perspective
   *
   * Inits main event listener,
   * which waits for commands to and processes get and save for cache's lastSyncTime
   */
  startListening() {
    this.bc.onmessage = ({ data }: { data: BroadcastData }) => {
      const { command, payload } = data;

      if (command === BROADCAST_COMMANDS.getLastSyncFromStorage) {
        this.postLastSyncTimeToChannel(payload as string);
      }

      if (command === BROADCAST_COMMANDS.saveLastSyncToStorage && isCacheSyncMsg(payload)) {
        this.saveLastSyncTimeToStorage(payload);
      }
    };
  }

  private postLastSyncTimeToChannel(cacheName: string) {
    const key = `${cacheName}-${syncAt}`;
    const ts = dataStorage.getData<number>(key) || 0;
    this.bc.postMessage(responseLastSyncTime({
      cacheName: cacheName,
      timestamp: +ts
    }));
  }

  private saveLastSyncTimeToStorage({ cacheName, timestamp }: CacheSyncTimeMsg) {
    const key = `${cacheName}-${syncAt}`;
    dataStorage.saveData(key, timestamp);
  }
}

export { BroadcastStorageHelper };
