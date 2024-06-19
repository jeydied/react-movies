import { RUNTIME_DIVIDER } from "constants/numbers";
import { format } from "date-fns";

export const releaseDate = (type: string, release: string) => {
  if (!release || release === "" || release === null) return "No Date";

  const dateToFormat = new Date(release);
  return type === "string"
    ? format(dateToFormat, "dd MMMM yyyy")
    : format(dateToFormat, "dd/MM/yyyy");
};

export const formatTitleForUrl = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / RUNTIME_DIVIDER);
  const remainingMinutes = minutes % RUNTIME_DIVIDER;
  return `${hours}h ${remainingMinutes}m`;
};
