export const BC_SYNC_CHANNEL = 'synctube';

export enum BROADCAST_COMMANDS {
  getLastSync = 'getLastSync',
  saveLastSync = 'saveLastSync',
  setLastSync = 'setLastSync',
}

export type BroadcastData = {
  command: BROADCAST_COMMANDS;
  payload?: string | number;
};

export const makeGetSyncTimeMsg = () => {
  return {
    command: BROADCAST_COMMANDS.getLastSync,
  };
};

export const makeSaveSyncTimeMsg = () => {
  return {
    command: BROADCAST_COMMANDS.saveLastSync,
    payload: Date.now(),
  };
};

export const makeSetSyncTimeMsg = (syncTimestamp: number) => {
  return {
    command: BROADCAST_COMMANDS.setLastSync,
    payload: syncTimestamp,
  };
};
