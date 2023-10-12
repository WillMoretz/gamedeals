import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    let cancelRequest = false;
    (async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (cancelRequest) return;
        setData(result);
      } catch (error) {
        if (cancelRequest) return;
        setError(error);
      } finally {
        if (cancelRequest) return;
        setLoading(false);
      }
    })();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return [data, error, loading];
}

export default useFetch;
