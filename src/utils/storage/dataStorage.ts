/**
 * Simple wrapper for localStorage with convenient generics
 */
const dataStorage = {
  /**
   * @param key storge key to get data from
   * @returns Object of given type T or null if not found
   */
  getData<T>(key: string): T | null {
    const savedData = localStorage.getItem(key);
    return savedData && JSON.parse(savedData);
  },

  /**
   * @param key storage key to save data at
   * @param data any data to save. It will be JSON-stringified and stored as plain string
   */
  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export { dataStorage };