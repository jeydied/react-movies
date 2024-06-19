import React from "react";
import { Box, Divider, IconButton, Sheet, Typography } from "@mui/joy";
import { Clear } from "@mui/icons-material";
import { SortSelect } from "./sort-select/sort-select";
import { Slider } from "./slider/slider";
import { Genres } from "./genres/genres";
import { Pagination } from "./pagination/pagination";
import { Search } from "./search/search";
import { FiltersProps } from "./filters.types";
import styles from "./filters.module.css";

export const Filters: React.FC<FiltersProps> = ({
  type,
  count,
  page,
  reset,
  genres,
  releaseYears,
  onTypeChange,
  onPageChange,
  onReset,
  onSearchMovies,
  onSetWithGenres,
  onReleaseYearsChange,
}) => {
  return (
    <Sheet className={styles.filters} key={reset}>
      <Box className={styles.header}>
        <Typography level="h3">Filters</Typography>
        <IconButton onClick={onReset}>
          <Clear />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1.5 }} />
      <Box className={styles.content}>
        <Search onSearchMovies={onSearchMovies} />
        <SortSelect type={type} onTypeChange={onTypeChange} />
        <Slider
          releaseYears={releaseYears}
          onReleaseYearsChange={onReleaseYearsChange}
        />
        <Genres genres={genres} onSetWithGenres={onSetWithGenres} />
        <Pagination count={count} page={page} onPageChange={onPageChange} />
      </Box>
    </Sheet>
  );
};
