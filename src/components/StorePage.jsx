import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";

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
        <StoreItem game={game} key={game.dealID} />
      ))}
    </>
  );
}

export default StorePage;
