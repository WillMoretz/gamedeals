import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";

function StorePage() {
  const params = useParams();
  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${params.id}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  return (
    <>
      {data.map((game) => (
        <div key={game.dealID}>
          <img src={game.thumb} alt={`${game.title} thumbnail`} />
          <span>{game.title} </span>
          <span>${game.salePrice} </span>
          <span>{Math.round(game.savings)}%</span>
          <Link to={`/deal/${game.dealID}`}>link</Link>
        </div>
      ))}
    </>
  );
}

export default StorePage;
