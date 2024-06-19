import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN } from "constants/tokens";
import { BASE_URL, GENRES_ENDPOINT } from "constants/urls";
import { Genres } from "types/common";

export const genresApi = createApi({
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-type", "application/json");
      headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getGenres: builder.query<Genres, void>({
      query: () => ({
        url: `${GENRES_ENDPOINT}`,
      }),
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
