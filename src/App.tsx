import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as MaterialExtendTheme,
  THEME_ID,
} from "@mui/material";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy";
import { Home, NotFound, MovieDetails } from "./pages";
import { Authorization, Layout } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movie/:id", element: <MovieDetails /> },
    ],
  },
]);

const materialTheme = MaterialExtendTheme();

interface Authentication {
  authentication: {
    authenticated: boolean;
  };
}

export default function App() {
  const isAuthenticated = useSelector(
    (state: Authentication) => state.authentication.authenticated
  );

  return (
    <>
      <MaterialCssVarsProvider
        theme={{ [THEME_ID]: materialTheme }}
        defaultMode="system"
        modeStorageKey="identify-system-mode"
      >
        <JoyCssVarsProvider
          defaultMode="system"
          modeStorageKey="identify-system-mode"
        >
          {isAuthenticated ? (
            <RouterProvider router={router} />
          ) : (
            <Authorization />
          )}
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </>
  );
}
