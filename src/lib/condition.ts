import { LOW_RATING, MEDIUM_RATING } from "constants/numbers";

export const IS_EMPTY_STRING = (value: string) => {
  return value.trim() === "";
};

export const circularColor = (value: number) => {
  return value < LOW_RATING
    ? "danger"
    : value < MEDIUM_RATING
    ? "warning"
    : "primary";
};
