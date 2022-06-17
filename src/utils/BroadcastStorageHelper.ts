import { BroadcastData, BROADCAST_COMMANDS, makeSetSyncTimeMsg } from '../globals';
import { dataStorage } from './storage/dataStorage';

const syncTimeStorageKey = 'lastSyncAt';

class BroadcastStorageHelper {
  private bc: BroadcastChannel;

  constructor(channelName: string) {
    this.bc = new BroadcastChannel(channelName);
  }

  /**
   * Inits main event listener,
   * which waits for commands to and processes get and save lastSyncTime
   */
  startListening() {
    this.bc.onmessage = ({ data }: { data: BroadcastData }) => {
      const { command, payload } = data;

      if (command === BROADCAST_COMMANDS.getLastSync) {
        this.postLastSyncTimeToChannel();
      }

      if (command === BROADCAST_COMMANDS.saveLastSync) {
        this.saveLastSyncTimeToStorage(payload);
      }
    };
  }

  private postLastSyncTimeToChannel() {
    const ts = dataStorage.getData<number>(syncTimeStorageKey) || 0;
    this.bc.postMessage(makeSetSyncTimeMsg(+ts));
  }

  private saveLastSyncTimeToStorage(payload: number = 0) {
    dataStorage.saveData(syncTimeStorageKey, payload);
  }
}

export { BroadcastStorageHelper };
