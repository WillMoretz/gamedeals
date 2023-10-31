import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../useFetch";
import StoreItem from "./StoreItem";
import filterRepeatDeals from "../filterRepeatDeals";

const OPTION_PARAMS = ["filter"];

// Displays all of the game stores
function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(
    searchParams.get("title") === null ? "" : searchParams.get("title")
  );
  const [steamRating, setSteamRating] = useState(
    searchParams.get("steamRating") === null
      ? 0
      : searchParams.get("steamRating")
  );
  const [steamRatingEnabled, setSteamRatingEnabled] = useState(
    searchParams.get("steamRating") === null ? false : true
  );

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

  const updateParam = (paramName, condition, value) => {
    setSearchParams(
      (prev) => {
        if (condition) prev.set(paramName, value);
        else prev.delete(paramName);
        return prev;
      },
      { replace: true }
    );
  };

  const toggleSteam = (bool) => {
    setSteamRatingEnabled(bool);
    updateParam("steamRating", bool, steamRating);
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
          onChange={(e) => updateParam("filter", e.target.checked, 1)}
        />
        <label htmlFor="aaaCheckbox">AAA</label>
        <input
          type="checkbox"
          name="aaaCheckbox"
          id="aaaCheckbox"
          checked={searchParams.get("AAA") === "1"}
          onChange={(e) => updateParam("AAA", e.target.checked, 1)}
        />
        <label htmlFor="steamworks">Steamworks</label>
        <input
          type="checkbox"
          name="steamworks"
          id="steamworks"
          checked={searchParams.get("steamworks") === "1"}
          onChange={(e) => updateParam("steamworks", e.target.checked, 1)}
        />
        <label htmlFor="onSale">On Sale</label>
        <input
          type="checkbox"
          name="onSale"
          id="onSale"
          checked={searchParams.get("onSale") === "1"}
          onChange={(e) => updateParam("onSale", e.target.checked, 1)}
        />
        <label htmlFor="exact">Exact Match</label>
        <input
          type="checkbox"
          name="exact"
          id="exact"
          checked={searchParams.get("exact") === "1"}
          onChange={(e) => updateParam("exact", e.target.checked, 1)}
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              updateParam("title", title !== "", title);
            }
          }}
          onBlur={() => updateParam("title", title !== "", title)}
        />
        <button
          type="button"
          onClick={() => updateParam("title", title !== "", title)}
        >
          Search Titles
        </button>
        <label htmlFor="toggleSteamRating">Steam Rating</label>
        <input
          type="checkbox"
          name="toggleSteamRating"
          id="toggleSteamRating"
          checked={steamRatingEnabled}
          onChange={(e) => toggleSteam(e.target.checked)}
        />
        <input
          type="range"
          name="steamRating"
          id="steamRating"
          min={0}
          max={100}
          step={5}
          value={steamRating}
          disabled={!steamRatingEnabled}
          onChange={(e) => setSteamRating(e.target.value)}
          onMouseUp={() => updateParam("steamRating", true, steamRating)}
        />
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
