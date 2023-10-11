import useFetch from "../useFetch";

// Displays a deal from a specific store for a specific game
function Deal({ id }) {
  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals?id=${id}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return <div>{data.gameInfo.name}</div>;
}

export default Deal;
