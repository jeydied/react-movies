import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./api/moviesApi";
import { favoritesApi } from "./api/favoritesApi";
import { genresApi } from "./api/genresApi";
import authenticationReducer from "./slicer/authenticationSlice";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [genresApi.reducerPath]: genresApi.reducer,
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moviesApi.middleware,
      favoritesApi.middleware,
      genresApi.middleware
    ),
});
