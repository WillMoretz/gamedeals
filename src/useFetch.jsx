import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Make API call
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await fetch(url, { signal: signal });
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.message !== "The operation was aborted. ") setError(error);
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  return [data, error, loading];
}

export default useFetch;
