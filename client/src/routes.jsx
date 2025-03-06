import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import MovieListingPage from "./pages/MovieListingPage";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./routes/RequireAuth";
import UnauthorizedPage from "./pages/UnauthorizedPage";

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
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "movies",
        element: <MovieListingPage />,
      },
    ],
  },
]);

export default router;
