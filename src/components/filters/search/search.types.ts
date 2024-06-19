import { ChangeEvent } from "react";

export interface SearchProps {
  onSearchMovies: (e: ChangeEvent<HTMLInputElement>) => void;
}
