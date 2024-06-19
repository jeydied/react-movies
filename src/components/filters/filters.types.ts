import { ChangeEvent, SyntheticEvent } from "react";
import { Genre } from "types/common";

export interface FiltersProps {
  type: string;
  count: number;
  page: number;
  reset: number;
  genres: Genre[];
  releaseYears: number[];
  onTypeChange: (type: string) => void;
  onPageChange: (page: number) => void;
  onReset: () => void;
  onSearchMovies: (e: ChangeEvent<HTMLInputElement>) => void;
  onSetWithGenres: (
    _: SyntheticEvent<Element, Event>,
    newValue: Genre[]
  ) => void;
  onReleaseYearsChange: (e: Event, newValue: number | number[]) => void;
}
