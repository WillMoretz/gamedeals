import { Link } from "react-router-dom";

// Displays a game store
function Store({ data }) {
  return (
    <div>
      <img src={data.thumb} alt={`${data.title} thumbnail`} />
      <span>{data.title} </span>
      <span>${data.salePrice} </span>
      <span>{Math.round(data.savings)}%</span>
      <Link to={`deal/${data.dealID}`}>link</Link>
    </div>
  );
}

export default Store;
