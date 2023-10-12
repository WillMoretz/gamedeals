import StoreCard from "./StoreCard";

const STORE_IDS = [1, 4, 25, 7, 11, 3, 5, 15];

// Displays the home page, the landing page
function HomePage() {
  return <StoreCard id={STORE_IDS[0]} />;
}

export default HomePage;
