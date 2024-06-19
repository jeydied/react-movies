import { useEffect, useState } from "react";
import { Alert, Box, IconButton } from "@mui/joy";
import { Close, Report } from "@mui/icons-material";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
} from "store/api/favoritesApi";
import { MoviesCard } from "./movies-card/movies-card";
import { ALERT_DELAY, INITIAL, USER_ID } from "constants/numbers";
import { FAILED_ADD_FAVORITE_REQUEST } from "constants/errors";
import { Movie } from "types/common";
import styles from "./movies-list.module.css";

export const MoviesList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const {
    data: favorites = {
      page: INITIAL,
      results: [],
      total_pages: INITIAL,
      total_results: INITIAL,
    },
  } = useGetFavoritesQuery(USER_ID);
  const [addFavorite, { isError }] = useAddFavoriteMutation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isError) setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, ALERT_DELAY);

    return () => clearTimeout(timer);
  }, [isError]);

  const handleAddFavorite = (mediaId: number, isFavorite: boolean) => {
    addFavorite({ userId: USER_ID, mediaId: mediaId, isFavorite });
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Box className={styles.movies}>
        {showAlert && (
          <Alert
            color="danger"
            size="lg"
            sx={{
              position: "fixed",
              width: "20%",
              bottom: "24px",
              right: "16px",
              height: "50px",
              zIndex: 10,
            }}
            startDecorator={<Report color="error" />}
            endDecorator={
              <IconButton
                variant="soft"
                color={"danger"}
                onClick={handleDismiss}
              >
                <Close />
              </IconButton>
            }
          >
            {FAILED_ADD_FAVORITE_REQUEST}
          </Alert>
        )}
        {movies &&
          favorites &&
          movies?.map((movie: Movie) => (
            <MoviesCard
              movie={movie}
              favorites={favorites.results}
              onAddFavorite={handleAddFavorite}
            />
          ))}
      </Box>
    </>
  );
};
