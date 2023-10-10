import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import ErrorPage from "./ErrorPage";

// Routes the user to page components based on the url
function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
