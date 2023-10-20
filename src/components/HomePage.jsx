import { Link } from "react-router-dom";
import StoreCard from "./StoreCard";
import TopDeals from "./TopDeals";

const STORES = [
  { id: 1, name: "Steam" },
  { id: 4, name: "Amazon" },
  { id: 25, name: "Epic Games Store" },
  { id: 7, name: "GOG" },
  { id: 11, name: "Humble Store" },
  { id: 3, name: "GreenManGaming" },
  { id: 5, name: "Gamestop" },
  { id: 15, name: "Fanatical" },
];

// Displays the home page, the landing page
function HomePage() {
  return (
    <>
      <TopDeals />
      <StoreCard id={STORES[0].id} name={STORES[0].name} />
      <Link to="/browse/">View more deals on the browse page!</Link>
    </>
  );
}

export default HomePage;
