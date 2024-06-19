import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN } from "constants/tokens";
import { BASE_URL, SEARCH_ENDPOINT } from "constants/urls";
import { MoviesList } from "types/common";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  tagTypes: ["Movies"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<MoviesList, { value: string; page: number }>({
      query: ({ value, page }) => ({
        url: `${value}&page=${page}`,
      }),
    }),
    getDetails: builder.query({
      query: (id) => ({
        url: `movie/${id}`,
      }),
    }),
    getCredits: builder.query({
      query: (id) => ({
        url: `movie/${id}/credits`,
      }),
    }),
    getMedia: builder.query({
      query: (id) => ({
        url: `movie/${id}/videos`,
      }),
    }),
    searchMovies: builder.query<
      MoviesList,
      { queryText: string; page: number }
    >({
      query: ({ queryText, page }) => ({
        method: "GET",
        url: `${SEARCH_ENDPOINT}${queryText}&page=${page}`,
      }),
    }),
    advancedFiltering: builder.query<
      MoviesList,
      {
        page: number;
        genres: number[];
        releaseDateGte: string;
        releaseDateLte: string;
      }
    >({
      query: ({ page, genres, releaseDateGte, releaseDateLte }) => ({
        url: `discover/movie?language=en-US&page=${page}&with_genres=${genres}&primary_release_date.gte=${releaseDateGte}&primary_release_date.lte=${releaseDateLte}`,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetDetailsQuery,
  useGetCreditsQuery,
  useGetMediaQuery,
  useSearchMoviesQuery,
  useAdvancedFilteringQuery,
} = moviesApi;
