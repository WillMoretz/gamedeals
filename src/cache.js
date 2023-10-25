const CACHE = {};

function addCacheItem(key, value) {
  CACHE[sortParamString(key)] = value;
}

function sortParamString(paramStr) {
  const split1 = paramStr.split("?");
  if (!split1[1]) return split1[0];
  const split2 = split1[1].split("&");
  const sortedArr = split2.sort();
  return `${split1[0]}?${sortedArr.join("&")}`;
}

function fetchCacheItem(key) {
  return CACHE[sortParamString(key)];
}

export { addCacheItem, fetchCacheItem };
