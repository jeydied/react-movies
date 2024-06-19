import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import {
  Alert,
  AspectRatio,
  Box,
  Card,
  CardContent,
  CardOverflow,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemContent,
  Typography,
} from "@mui/joy";
import {
  Bookmark,
  Close,
  Favorite,
  ListAlt,
  Report,
} from "@mui/icons-material";
import {
  useAddFavoriteMutation,
  useGetCreditsQuery,
  useGetDetailsQuery,
  useGetFavoritesQuery,
  useGetMediaQuery,
} from "store/index";
import { IMAGE_BASE_URL } from "constants/urls";
import { formatRuntime, releaseDate } from "lib/format";
import {
  ALERT_DELAY,
  DEFAULT_PAGE,
  INITIAL,
  MAIN_CAST_MAX,
  USER_ID,
  VOTE_MULTIPLIER,
} from "constants/numbers";
import { circularColor } from "lib/condition";
import { Cast, Genres, Media } from "./movie-details.types";
import styles from "./movie-details.module.css";
import { FAILED_ADD_FAVORITE_REQUEST } from "constants/errors";

export const MovieDetails = () => {
  const [showAlert, setShowAlert] = useState(false);
  const movieId = useParams().id;
  const { data: details = [] } = useGetDetailsQuery(movieId);
  const { data: credits = [] } = useGetCreditsQuery(movieId);
  const { data: media = [] } = useGetMediaQuery(movieId);
  const mainCast = credits.cast?.slice(INITIAL, MAIN_CAST_MAX);
  const trailer = media.results?.filter(
    (media: Media) => media.type === "Trailer"
  );
  const {
    data: favorites = {
      page: DEFAULT_PAGE,
      results: [],
      total_pages: INITIAL,
      total_results: INITIAL,
    },
  } = useGetFavoritesQuery(USER_ID);
  const [addFavorite, { isError }] = useAddFavoriteMutation();

  useEffect(() => {
    if (isError) setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, ALERT_DELAY);

    return () => clearTimeout(timer);
  }, [isError]);

  const isFavorite = (movieId: number) =>
    favorites.results.some((fav) => fav.id === movieId);

  const handleAddFavorite = (mediaId: number, isFavorite: boolean) => {
    addFavorite({ userId: USER_ID, mediaId: mediaId, isFavorite });
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
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
            <IconButton variant="soft" color={"danger"} onClick={handleDismiss}>
              <Close />
            </IconButton>
          }
        >
          {FAILED_ADD_FAVORITE_REQUEST}
        </Alert>
      )}
      <Box className={styles.movieDetails}>
        <Box className={styles.overview}>
          <img
            loading="lazy"
            src={IMAGE_BASE_URL + details.poster_path}
            alt={details.title}
            className={styles.image}
          />
          <Box className={styles.info}>
            <Box className={styles.title}>
              <Typography level="h2">
                {details?.original_title || details?.original_name}
              </Typography>
              <Box className={styles.movieDetailsInfo}>
                <Box className={styles.releaseDate}>
                  <Typography level="body-md">
                    {releaseDate("date", details.release_date)}
                  </Typography>
                </Box>
                <Box className={styles.genres}>
                  {details.genres?.map((genre: Genres) => (
                    <Link level="body-md" key={genre.id}>
                      {genre.name}
                    </Link>
                  ))}
                </Box>
                <Box className={styles.runtime}>
                  <Typography level="body-md">
                    {formatRuntime(details.runtime)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box className={styles.rating}>
              <CircularProgress
                value={details.vote_average * VOTE_MULTIPLIER}
                thickness={5}
                size="lg"
                className={styles.circle}
                color={circularColor(details.vote_average)}
              >
                {details.vote_average
                  ? Math.round(details.vote_average * VOTE_MULTIPLIER) + "%"
                  : "NR"}
              </CircularProgress>
              <Typography level="title-md">Rating</Typography>

              <Box className={styles.actions}>
                <IconButton variant="outlined" size="lg">
                  <ListAlt fontSize="small" />
                </IconButton>

                <IconButton
                  variant="outlined"
                  size="lg"
                  className={styles.favorite}
                  onClick={() =>
                    handleAddFavorite(
                      details.id,
                      isFavorite(details.id) ? false : true
                    )
                  }
                >
                  <Favorite
                    fontSize="small"
                    color={isFavorite(details.id) ? "error" : "action"}
                  />
                </IconButton>

                <IconButton variant="outlined" size="lg">
                  <Bookmark fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box className={styles.review}>
              <Typography level="title-lg" className={styles.reviewTitle}>
                Overview
              </Typography>
              <Typography level="body-md">{details.overview}</Typography>
            </Box>
            <Box className={styles.mainCast}>
              <List key={details.id}>
                {mainCast?.map((cast: Cast) => (
                  <ListItem>
                    <ListItemContent>
                      <Link level="body-md">{cast.name}</Link>
                      <Typography level="title-md">{cast.character}</Typography>
                    </ListItemContent>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>

        <Box className={styles.media}>
          {media.results?.length > INITIAL ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${
                trailer && trailer[INITIAL]?.key
              }`}
              controls={true}
              width={"100%"}
              height={"600px"}
            />
          ) : (
            "No media found"
          )}
        </Box>

        <Box className={styles.cast}>
          <Typography level="h3">Main cast</Typography>
          <Box className={styles.castList}>
            {credits?.cast?.map((cast: Cast) => (
              <Card className={styles.card} variant="outlined">
                <CardOverflow>
                  <AspectRatio ratio="1">
                    <img
                      src={IMAGE_BASE_URL + cast.profile_path}
                      loading="lazy"
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md">
                    <Link overlay className={styles.link}>
                      {cast.name}
                    </Link>
                  </Typography>
                  <Typography level="body-sm" className={styles.character}>
                    {cast.character}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};
