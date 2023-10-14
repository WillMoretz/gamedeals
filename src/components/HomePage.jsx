import StoreCard from "./StoreCard";

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
  return <StoreCard id={STORES[0].id} name={STORES[0].name} />;
}

export default HomePage;
