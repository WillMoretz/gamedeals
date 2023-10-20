import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";
import filterRepeatDeals from "../filterRepeatDeals";

function TopDeals() {
  const [data, error, loading] = useFetch(
    "https://www.cheapshark.com/api/1.0/deals?steamRating=75&steamworks=1&AAA=1&upperPrice=30&sortBy=Metacritic&onSale=1"
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  const filteredData = filterRepeatDeals(data, 10);

  return (
    <>
      <h2>Top Deals</h2>
      {filteredData.map((deal) => (
        <StoreItem deal={deal} key={deal.dealID} />
      ))}
      <Link to="/browse/">View More</Link>
    </>
  );
}

export default TopDeals;
