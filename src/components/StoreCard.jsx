import useFetch from "../useFetch";
import Store from "./Store";

// Displays a game store and some of its top rated deals
function StoreCard({ id }) {
  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${id}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;
  return <Store data={data} />;
}

export default StoreCard;
