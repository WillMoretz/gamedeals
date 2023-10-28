import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";
import filterRepeatDeals from "../filterRepeatDeals";

const OPTION_PARAMS = ["filter"];

// Displays all of the game stores
function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");

  // Build the API query
  let query = "";
  for (const param of searchParams) {
    // [0] contains param name, [1] contains param value
    if (!OPTION_PARAMS.includes(param[0])) {
      if (query === "") query += `?${param[0]}=${param[1]}`;
      else query += `&${param[0]}=${param[1]}`;
    }
  }

  const [data, error, loading] = useFetch(
    `https://www.cheapshark.com/api/1.0/deals${query}`
  );

  const toggleParam = (paramName, shouldEnable) => {
    setSearchParams(
      (prev) => {
        if (shouldEnable) prev.set(paramName, 1);
        else prev.delete(paramName);
        return prev;
      },
      { replace: true }
    );
  };

  const updateTitleParam = () => {
    setSearchParams(
      (prev) => {
        if (title !== "") prev.set("title", title);
        else prev.delete("title");
        return prev;
      },
      { replace: true }
    );
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message || "Load Failed"}</div>;

  const shouldFilter = searchParams.get("filter") === "1";
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
          checked={shouldFilter}
          onChange={(e) => toggleParam("filter", e.target.checked)}
        />
        <label htmlFor="aaaCheckbox">AAA</label>
        <input
          type="checkbox"
          name="aaaCheckbox"
          id="aaaCheckbox"
          checked={searchParams.get("AAA") === "1"}
          onChange={(e) => toggleParam("AAA", e.target.checked)}
        />
        <label htmlFor="steamworks">Steamworks</label>
        <input
          type="checkbox"
          name="steamworks"
          id="steamworks"
          checked={searchParams.get("steamworks") === "1"}
          onChange={(e) => toggleParam("steamworks", e.target.checked)}
        />
        <label htmlFor="onSale">On Sale</label>
        <input
          type="checkbox"
          name="onSale"
          id="onSale"
          checked={searchParams.get("onSale") === "1"}
          onChange={(e) => toggleParam("onSale", e.target.checked)}
        />
        <label htmlFor="exact">Exact Match</label>
        <input
          type="checkbox"
          name="exact"
          id="exact"
          checked={searchParams.get("exact") === "1"}
          onChange={(e) => toggleParam("exact", e.target.checked)}
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        <button type="button" onClick={() => updateTitleParam()}>
          Search Titles
        </button>
        <button
          type="button"
          onClick={() => {
            setTitle("");
            setSearchParams(() => new URLSearchParams(), { replace: true });
          }}
        >
          Reset Filters
        </button>
      </form>
      {filteredData.map((deal) => (
        <StoreItem deal={deal} key={deal.dealID} />
      ))}
    </>
  );
}

export default BrowsePage;
