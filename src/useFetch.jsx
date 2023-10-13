import { useEffect, useReducer } from "react";
import { fetchCacheItem, addCacheItem } from "./cache";

// const CACHE = {};

function useFetch(url) {
  // State values that are returned from the hook
  const initialState = {
    data: null,
    error: null,
    loading: true,
  };

  // Update the state
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SUCCESS":
        return { ...initialState, loading: false, data: action.payload };
      case "ERROR":
        return { ...initialState, loading: false, error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    if (!url) return;
    let shouldCancelRequest = false;

    // Perform the fetch
    (async () => {
      try {
        const cacheItem = fetchCacheItem(url);
        if (cacheItem) {
          // If data is cached, use it
          console.log(`data at ${url} loaded from cache`);
          dispatch({ type: "SUCCESS", payload: cacheItem });
        } else {
          // If data is not cached, fetch it
          const response = await fetch(url);
          const data = await response.json();
          addCacheItem(url, data);
          if (shouldCancelRequest) return;
          console.log(`data at ${url} loaded from fetch`);
          dispatch({ type: "SUCCESS", payload: data });
        }
      } catch (error) {
        if (shouldCancelRequest) return;
        dispatch({ type: "ERROR", payload: error });
      }
    })();

    // Will prevent new actions from being dispatched if the the component using this hook unmounts during the fetch
    return function cleanup() {
      shouldCancelRequest = true;
    };
  }, [url]);

  return [state.data, state.error, state.loading];
}

export default useFetch;
