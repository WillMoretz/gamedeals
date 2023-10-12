import { useEffect, useReducer } from "react";

function useFetch(url) {
  const initialState = {
    data: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOADED":
        return { ...initialState, loading: false, data: action.payload };
      case "ERROR":
        return { ...initialState, loading: false, error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    if (!url) return;

    let cancelRequest = false;
    (async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (cancelRequest) return;
        dispatch({ type: "LOADED", payload: result });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: "ERROR", payload: error });
      }
    })();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return [state.data, state.error, state.loading];
}

export default useFetch;
