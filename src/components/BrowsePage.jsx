import { useSearchParams } from "react-router-dom";

// Displays all of the game stores
function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  console.log(searchParams.toString());

  return <div>NOT IMPLEMENTED: STORE PAGE</div>;
}

export default StorePage;
