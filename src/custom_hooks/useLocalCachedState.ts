import { useCallback, useState } from 'react';
import { dataStorage } from '../utils/storage/dataStorage';

type CachedState<T> = [
  T | null,
  (data: T | null) => void
];

function useLocalCachedState<T>(localCacheKey: string): CachedState<T> {
  const cachedState = dataStorage.getData<T>(localCacheKey);
  const [state, setState] = useState<T | null>(cachedState);

  const setAndCacheCurrentCity = useCallback(
    (data: T | null) => {
      if (data !== null) dataStorage.saveData(localCacheKey, data);
      setState(data);
    },
    [setState, localCacheKey]
  );

  return [state, setAndCacheCurrentCity];
}

export default useLocalCachedState;
