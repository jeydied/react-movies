interface UserData {
  id: number;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  username: string;
}

export interface AuthenticationResponse {
  token: string;
  data: UserData;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FavoritesList extends MoviesList {}

export interface MovieCardProps {
  movie: Movie;
  favorites: Movie[];
  onAddFavorite: (id: number, isFavorite: boolean) => void;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Genres {
  genres: Genre[];
}

export interface GenresProps {
  genres: Genre[];
}
