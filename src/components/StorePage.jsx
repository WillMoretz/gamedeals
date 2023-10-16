import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";

function StorePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals?storeID=${params.id}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;
  if (data.length === 0) return navigate("/"); //TODO: Navigate to error page

  return (
    <>
      {data.map((game) => (
        <StoreItem game={game} key={game.dealID} />
      ))}
    </>
  );
}

export default StorePage;
