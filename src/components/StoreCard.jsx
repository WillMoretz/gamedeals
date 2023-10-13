import useFetch from "../useFetch";
import Store from "./Store";

// Displays a game store and some of its top rated deals
function StoreCard({ id }) {
  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${id}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  const trimmedData = data.slice(0, 5);

  return (
    <>
      {trimmedData.map((game) => (
        <Store data={game} key={game.dealID} />
      ))}
    </>
  );
}

export default StoreCard;
