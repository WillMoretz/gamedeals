import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Make API call
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if (response.status >= 400) {
          throw new Error("server error");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [data, error, loading];
}

export default useFetch;
