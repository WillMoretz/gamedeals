import useFetch from "../useFetch";
import StoreItem from "./StoreItem";

function TopDeals() {
  const [data, error, loading] = useFetch(
    "https://www.cheapshark.com/api/1.0/deals?steamRating=75&steamworks=1&lowerPrice=20"
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  const trimmedData = data.slice(0, 10);
  console.log(data);

  return (
    <>
      <h2>Top Deals</h2>
      {trimmedData.map((game) => (
        <StoreItem game={game} key={game.dealID} />
      ))}
    </>
  );
}

export default TopDeals;
