import { BroadcastData, BROADCAST_COMMANDS, makeGetSyncTimeMsg, makeSaveSyncTimeMsg } from '../globals';
import makeLogger from './logger';

const logger = makeLogger('[SERVICE_WORKER|BROADCAST_HELPER]', process.env.REACT_APP_DEBUG_LOG === '1');
const eventName = 'message';

class BroadcastHelper {
  private bc: BroadcastChannel;

  constructor(channelName: string) {
    this.bc = new BroadcastChannel(channelName);
  }

  /**
   * Sends message with command that we need to get weather last sync time
   *
   * @returns {Promise<number>}
   */
  async getlastSyncTime() {
    return new Promise<number>((res) => {
      // temp event handler for one-time response catch
      const eventHandler = ({ data }: { data: BroadcastData }) => {
        if (data.command === BROADCAST_COMMANDS.setLastSync) {
          this.bc.removeEventListener(eventName, eventHandler);
          res(+(data.payload || 0));
        }
      };

      logger.info('Gettig last sync time if available...');
      this.bc.addEventListener(eventName, eventHandler);
      this.bc.postMessage(makeGetSyncTimeMsg());
    });
  }

  /**
   * Sends message with command to save current datetime as last weather sync
   */
  saveCurrentsyncTime() {
    logger.log('Saving last sync time to the storage...');
    this.bc.postMessage(makeSaveSyncTimeMsg());
  }
}

export { BroadcastHelper };
