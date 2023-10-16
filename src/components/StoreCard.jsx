import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";

// Displays a game store and some of its top rated deals
function StoreCard({ id, name }) {
  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${id}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  const trimmedData = data.slice(0, 5);

  return (
    <>
      <Link to={`/stores/${id}`}>
        <img
          src={`https://www.cheapshark.com/img/stores/icons/${id - 1}.png`}
          alt={`Logo of ${name}`}
        />
        <h3>{name}</h3>
      </Link>
      {trimmedData.map((game) => (
        <StoreItem game={game} key={game.dealID} />
      ))}
    </>
  );
}

export default StoreCard;
