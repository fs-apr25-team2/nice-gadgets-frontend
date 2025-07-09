import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));

      window.dispatchEvent(
        new CustomEvent('local-storage-change', {
          detail: { key, value: storedValue },
        }),
      );
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === key) {
        setStoredValue(customEvent.detail.value);
      }
    };

    window.addEventListener('local-storage-change', handleStorageChange);
    return () =>
      window.removeEventListener('local-storage-change', handleStorageChange);
  }, [key]);

  return [storedValue, setStoredValue] as const;
};
