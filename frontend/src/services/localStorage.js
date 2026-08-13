// When a real backend is ready, replace the slice's thunks in

const PREFIX = "aone_construction_";

export function loadFromStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Failed to read "${key}" from storage, using fallback.`, err);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Failed to persist "${key}" to storage.`, err);
  }
}
