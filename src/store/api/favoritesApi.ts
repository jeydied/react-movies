import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN } from "constants/tokens";
import { BASE_URL, FAVORITE_ENDPOINT } from "constants/urls";
import { FavoritesList, Movie } from "types/common";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query<FavoritesList, string | undefined>({
      query: (userId) => ({
        url: `account/${userId}${FAVORITE_ENDPOINT}`,
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result) =>
        result ? [{ type: "Favorites", id: "LIST" }] : [],
    }),

    addFavorite: builder.mutation({
      query: ({ userId, mediaId, isFavorite }) => ({
        url: `account/${userId}/favorite`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: {
          media_type: "movie",
          media_id: mediaId,
          favorite: isFavorite,
        },
      }),

      async onQueryStarted(
        { userId, mediaId, isFavorite },
        { dispatch, queryFulfilled }
      ) {
        const patchResults = dispatch(
          favoritesApi.util.updateQueryData("getFavorites", userId, (draft) => {
            if (isFavorite) {
              draft.results.push({ id: mediaId } as Movie);
            } else {
              draft.results = draft.results.filter((fav) => fav.id !== mediaId);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResults.undo();
        }
      },
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation } = favoritesApi;
