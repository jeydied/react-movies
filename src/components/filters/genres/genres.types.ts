import { SyntheticEvent } from "react";
import { Genre } from "types/common";

export interface GenresProps {
  genres: Genre[];
  onSetWithGenres: (
    _: SyntheticEvent<Element, Event>,
    newValue: Genre[]
  ) => void;
}
