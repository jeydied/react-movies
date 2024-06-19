import { Autocomplete, Box, Typography } from "@mui/joy";
import { GenresProps } from "./genres.types";
import styles from "./genres.module.css";

export const Genres: React.FC<GenresProps> = ({ genres, onSetWithGenres }) => {
  return (
    <Box className={styles.genres}>
      <Typography level="body-md" className={styles.title}>
        Genres:
      </Typography>
      <Autocomplete
        multiple={true}
        options={genres}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.name}
        disableCloseOnSelect
        onChange={onSetWithGenres}
      />
    </Box>
  );
};
