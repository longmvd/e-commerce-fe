export const getLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

// Function to set a new value
export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
export function useLocalStorage() {
  // Function to set a cookie

  return {
    getLocalStorage,
    setLocalStorage,
    deleteLocalStorage,
  };
}
