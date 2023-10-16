import { Link } from "react-router-dom";
import useFetch from "../useFetch";

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
      <img
        src={`https://www.cheapshark.com/img/stores/icons/${id - 1}.png`}
        alt={`Logo of ${name}`}
      />
      <h3>{name}</h3>
      {trimmedData.map((game) => (
        <div key={game.dealID}>
          <img src={game.thumb} alt={`${game.title} thumbnail`} />
          <span>{game.title} </span>
          <span>${game.salePrice} </span>
          <span>{Math.round(game.savings)}%</span>
          <Link to={`deal/${game.dealID}`}>link</Link>
        </div>
      ))}
    </>
  );
}

export default StoreCard;
