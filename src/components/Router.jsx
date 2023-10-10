import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";
import BrowsePage from "./BrowsePage";
import AboutPage from "./AboutPage";

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
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
