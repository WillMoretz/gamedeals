import { Link } from "react-router-dom";

function StoreItem({ deal }) {
  return (
    <>
      <Link to={`/deal/${deal.dealID}`}>
        <img src={deal.thumb} alt={`${deal.title} thumbnail`} />
        <span>{deal.title} </span>
        <span>${deal.salePrice} </span>
        <span>{Math.round(deal.savings)}%</span>
      </Link>
      <Link to={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}>
        Buy
      </Link>
    </>
  );
}

export default StoreItem;
