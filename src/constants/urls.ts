const BASE_URL = "https://api.themoviedb.org/3/";
const POPULAR_ENDPOINT = `/movie/popular?language=en-US`;
const TOP_RATED_ENDPOINT = `/movie/top_rated?language=en-US`;
const SEARCH_ENDPOINT = `/search/movie?query=`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FAVORITE_ENDPOINT = `/favorite/movies`;
const USER_INFO_ENDPOINT = `/account/account_id`;
const GENRES_ENDPOINT = "genre/movie/list?language=en";

export {
  BASE_URL,
  POPULAR_ENDPOINT,
  TOP_RATED_ENDPOINT,
  SEARCH_ENDPOINT,
  IMAGE_BASE_URL,
  FAVORITE_ENDPOINT,
  USER_INFO_ENDPOINT,
  GENRES_ENDPOINT,
};
