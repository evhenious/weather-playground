export const BC_SYNC_CHANNEL = 'synctube';

export enum BROADCAST_COMMANDS {
  getLastSyncFromStorage = 'getLastSync',
  saveLastSyncToStorage = 'saveLastSync',
  lastSyncFromStorage = 'setLastSync',
}

export type BroadcastData = {
  command: BROADCAST_COMMANDS;
  payload: string | CacheSyncTimeMsg;
};

export type CacheSyncTimeMsg = {
  cacheName: string;
  timestamp: number;
};

// message creators
/**
 * Used from Web Worker, when it requests last sync time for a given cache name
 */
export const requestLastSyncTime = (cacheName: string) => {
  return {
    command: BROADCAST_COMMANDS.getLastSyncFromStorage,
    payload: cacheName,
  };
};

/**
 * Web Worker pushes it after given cache has been updated. Asks to update sync time
 */
export const requestSaveSyncTime = ({ cacheName, timestamp }: CacheSyncTimeMsg) => {
  return {
    command: BROADCAST_COMMANDS.saveLastSyncToStorage,
    payload: {
      cacheName,
      timestamp,
    },
  };
};

/**
 * Storage sends TO Web Worker as a response to **requestLastSyncTime**
 */
export const responseLastSyncTime = (payload: CacheSyncTimeMsg) => {
  return {
    command: BROADCAST_COMMANDS.lastSyncFromStorage,
    payload,
  };
};
