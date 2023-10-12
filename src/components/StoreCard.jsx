import { useEffect, useState } from "react";
import Store from "./Store";

// Displays a game store and some of its top rated deals
function StoreCard({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?storeID=${id}`
      );
      const result = await response.json();
      setData(result);
    })();
  }, [id]);

  return <Store data={data} />;
}

export default StoreCard;
