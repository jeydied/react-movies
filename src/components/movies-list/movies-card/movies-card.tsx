import { Favorite } from "@mui/icons-material";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  CircularProgress,
  Divider,
  Link,
  IconButton,
  Typography,
} from "@mui/joy";
import { releaseDate, formatTitleForUrl } from "lib/format";
import { circularColor } from "lib/condition";
import { VOTE_MULTIPLIER } from "constants/numbers";
import { IMAGE_BASE_URL } from "constants/urls";
import { MovieCardProps } from "types/common";
import styles from "./movies-card.module.css";

export const MoviesCard: React.FC<MovieCardProps> = ({
  movie,
  favorites,
  onAddFavorite,
}) => {
  const isFavorite = (movieId: number) =>
    favorites.some((fav) => fav.id === movieId);

  return (
    <Card variant="outlined" className={styles.card}>
      <CardOverflow>
        <IconButton size="sm" className={styles.favorite}>
          <Favorite
            fontSize="small"
            color={isFavorite(movie.id) ? "error" : "action"}
            className={styles.icon}
            onClick={() =>
              onAddFavorite(movie.id, isFavorite(movie.id) ? false : true)
            }
          />
        </IconButton>
        <AspectRatio ratio="1">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            loading="lazy"
            alt={movie.title}
          />
        </AspectRatio>
        <CircularProgress
          className={styles.circle}
          variant="soft"
          value={movie.vote_average * VOTE_MULTIPLIER}
          size="md"
          color={circularColor(movie.vote_average)}
          thickness={3}
        >
          {movie.vote_average
            ? Math.round(movie.vote_average * VOTE_MULTIPLIER) + "%"
            : "NR"}
        </CircularProgress>
      </CardOverflow>
      <CardContent sx={{ mt: 2 }}>
        <Typography level="title-md">
          <Link
            href={`/movie/${movie.id}-${formatTitleForUrl(movie.title)}`}
            overlay
            className={styles.link}
          >
            {movie.title}
          </Link>
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-sm">
            {releaseDate("string", movie.release_date)}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};
