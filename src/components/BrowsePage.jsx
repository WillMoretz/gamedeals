import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";
import filterRepeatDeals from "../filterRepeatDeals";

const OPTION_PARAMS = ["filter"];

// Displays all of the game stores
function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Build the API query
  let query = "";
  for (const param of searchParams) {
    // Skip params unrelated to API
    if (!OPTION_PARAMS.includes(param[0])) {
      if (query === "") query += `?${param[0]}=${param[1]}`;
      else query += `&${param[0]}=${param[1]}`;
    }
  }

  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals${query}`
  );

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  const shouldFilter = searchParams.get("filter") === "true";
  let filteredData = null;
  if (shouldFilter) filteredData = filterRepeatDeals(data);
  else filteredData = data;

  return (
    <>
      <form>
        <label htmlFor="filterRepeatsCheckbox">Filter Repeat Deals</label>
        <input
          type="checkbox"
          name="filterRepeatsCheckbox"
          id="filterRepeatsCheckbox"
          defaultChecked={shouldFilter}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set("filter", e.target.checked);
              return prev;
            })
          }
        />
      </form>
      {filteredData.map((deal) => (
        <StoreItem deal={deal} key={deal.dealID} />
      ))}
    </>
  );
}

export default BrowsePage;
