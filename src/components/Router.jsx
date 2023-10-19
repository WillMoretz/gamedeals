import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import BrowsePage from "./BrowsePage";
import AboutPage from "./AboutPage";
import StorePage from "./StorePage";
import DealPage from "./DealPage";

// Routes the user to page components based on the url
function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/browse",
      element: <BrowsePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/deal/:id",
      element: <DealPage />,
    },
    {
      path: "stores/:id",
      element: <StorePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
