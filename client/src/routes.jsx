import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import MovieListingPage from "./pages/MovieListingPage";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "movies",
        element: <MovieListingPage />,
      },
    ],
  },
]);

export default router;
