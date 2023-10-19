const CACHE = {};

function addCacheItem(key, value) {
  CACHE[key] = value;
}

function fetchCacheItem(key) {
  if (key in CACHE) return CACHE[key];
  return null;
}

export { addCacheItem, fetchCacheItem };
