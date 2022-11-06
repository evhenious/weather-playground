import { BroadcastData, BROADCAST_COMMANDS, CacheSyncTimeMsg, requestLastSyncTime, requestSaveSyncTime } from '../globals';
import makeLogger from './logger';

const logger = makeLogger('[SERVICE_WORKER|BROADCAST_HELPER]', process.env.REACT_APP_DEBUG_LOG === '1');
const eventName = 'message';

class BroadcastHelper {
  private bc: BroadcastChannel;

  constructor(channelName: string) {
    this.bc = new BroadcastChannel(channelName);
  }

  /**
   * Works from **WebWorker** perspective
   * Sends message with command that we need to get weather last sync time
   *
   * @returns {Promise<number>}
   */
  async getLastSyncTime(cacheName: string) {
    return new Promise<number>((resolve) => {
      // temp event handler for one-time response catch
      const catchLastSyncDate = ({ data }: { data: BroadcastData }) => {
        if (data.command === BROADCAST_COMMANDS.lastSyncFromStorage && (data.payload as CacheSyncTimeMsg).cacheName === cacheName) {
          this.bc.removeEventListener(eventName, catchLastSyncDate);
          resolve((data.payload as CacheSyncTimeMsg).timestamp);
        }
      };

      logger.log('Gettig last sync time if available...');
      this.bc.addEventListener(eventName, catchLastSyncDate);

      this.bc.postMessage(requestLastSyncTime(cacheName));
    });
  }

  /**
   * Works from **WebWorker** perspective
   * Sends message with command to save current datetime as last weather sync
   */
  saveSyncTime(cacheName: string) {
    logger.log(`Saving last sync time for [${cacheName}] to the storage...`);
    this.bc.postMessage(requestSaveSyncTime({
      cacheName,
      timestamp: Date.now(),
    }));
  }
}

export { BroadcastHelper };
