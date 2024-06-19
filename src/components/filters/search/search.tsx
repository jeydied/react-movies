import React from "react";
import { Box, Input } from "@mui/joy";
import { Search as SearchIcon } from "@mui/icons-material";
import { SearchProps } from "./search.types";
import styles from "./search.module.css";

export const Search: React.FC<SearchProps> = ({ onSearchMovies }) => {
  return (
    <Box className={styles.search}>
      <Input
        placeholder="Search..."
        variant="soft"
        startDecorator={<SearchIcon />}
        onChange={onSearchMovies}
      />
    </Box>
  );
};
