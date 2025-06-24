"use client";

export function getLocalStorageItemsByPrefix<T = unknown>(
  prefix: string
): Record<string, T> {
  const result: Record<string, T> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      try {
        const rawValue = localStorage.getItem(key);
        if (rawValue !== null) {
          const keyWithoutPrefix = key.slice(prefix.length);
          result[keyWithoutPrefix] = JSON.parse(rawValue) as T;
        }
      } catch (err) {
        console.warn(`Error parsing localStorage key "${key}":`, err);
      }
    }
  }

  return result;
}
