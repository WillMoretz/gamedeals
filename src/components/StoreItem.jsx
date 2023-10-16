import { Link } from "react-router-dom";

function StoreItem({ game }) {
  return (
    <Link to={`/deal/${game.dealID}`}>
      <img src={game.thumb} alt={`${game.title} thumbnail`} />
      <span>{game.title} </span>
      <span>${game.salePrice} </span>
      <span>{Math.round(game.savings)}%</span>
    </Link>
  );
}

export default StoreItem;
