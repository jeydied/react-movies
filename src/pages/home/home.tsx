import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Box, CircularProgress } from "@mui/joy";
import {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useAdvancedFilteringQuery,
} from "store/api/moviesApi";
import { Filters, MoviesList } from "components/index";
import {
  DEFAULT_PAGE,
  INITIAL,
  RELEASE_YEAR_END,
  RELEASE_YEAR_GTE_INDEX,
  RELEASE_YEAR_LTE_INDEX,
  RELEASE_YEAR_START,
} from "constants/numbers";
import { POPULAR_ENDPOINT, TOP_RATED_ENDPOINT } from "constants/urls";
import { useGetGenresQuery } from "store/api/genresApi";
import { Genre } from "types/common";
import styles from "./home.module.css";

export const Home = () => {
  const [type, setType] = useState<string>("Popular");
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [reset, setReset] = useState<number>(INITIAL);
  const [queryText, setQueryText] = useState<string>("");
  const [withGenres, setWithGenres] = useState<Genre[]>([]);
  const [releaseYears, setReleaseYears] = useState([
    RELEASE_YEAR_START,
    RELEASE_YEAR_END,
  ]);
  const withGenresIds = withGenres.map((genre) => genre.id);

  const {
    data: movies = {
      page: DEFAULT_PAGE,
      results: [],
      total_pages: INITIAL,
      total_results: INITIAL,
    },
    isLoading,
  } = useGetMoviesQuery({
    value: type === "Popular" ? POPULAR_ENDPOINT : TOP_RATED_ENDPOINT,
    page: page,
  });

  const {
    data: searchResults = {
      page: DEFAULT_PAGE,
      results: [],
      total_pages: INITIAL,
      total_results: INITIAL,
    },
  } = useSearchMoviesQuery({ queryText: queryText, page: page });

  const { data = { genres: [] } } = useGetGenresQuery();

  const {
    data: genresSortData = {
      page: DEFAULT_PAGE,
      results: [],
      total_pages: INITIAL,
      total_results: INITIAL,
    },
  } = useAdvancedFilteringQuery({
    genres: withGenresIds,
    page: page,
    releaseDateGte: `${releaseYears[RELEASE_YEAR_GTE_INDEX]}-01-01`,
    releaseDateLte: `${releaseYears[RELEASE_YEAR_LTE_INDEX]}-12-31`,
  });

  const moviesToDisplay = queryText
    ? searchResults
    : withGenresIds.length > INITIAL ||
      releaseYears[RELEASE_YEAR_GTE_INDEX] !== RELEASE_YEAR_START ||
      releaseYears[RELEASE_YEAR_LTE_INDEX] !== RELEASE_YEAR_END
    ? genresSortData
    : movies;

  const count = moviesToDisplay.total_pages;

  const handleResetFilters = () => {
    setType("Popular" as string);
    setPage(DEFAULT_PAGE as number);
    setReset((prevReset) => ++prevReset as number);
    setQueryText("" as string);
    setWithGenres([] as Genre[]);
    setReleaseYears([RELEASE_YEAR_START, RELEASE_YEAR_END] as number[]);
  };

  const handleChangeType = (type: string) => {
    setType(type as string);
  };

  const handleSetPage = (page: number) => {
    setPage(page as number);
  };

  const handleSearchMovies = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryText(e.target.value as string);
    setPage(DEFAULT_PAGE as number);
  };

  const handleWithGenres = (
    _: SyntheticEvent<Element, Event>,
    newValue: Genre[]
  ) => {
    setWithGenres(newValue as Genre[]);
    setPage(DEFAULT_PAGE as number);
  };

  const handleChangeReleaseYears = (_: Event, newValue: number | number[]) => {
    setReleaseYears(newValue as number[]);
  };

  return (
    <Box className={styles.home}>
      <Filters
        key={reset}
        type={type}
        count={count}
        page={page}
        reset={reset}
        genres={data.genres}
        releaseYears={releaseYears}
        onTypeChange={handleChangeType}
        onPageChange={handleSetPage}
        onReset={handleResetFilters}
        onSearchMovies={handleSearchMovies}
        onSetWithGenres={handleWithGenres}
        onReleaseYearsChange={handleChangeReleaseYears}
      />
      {isLoading ? (
        <CircularProgress size="lg" />
      ) : (
        <MoviesList movies={moviesToDisplay.results} />
      )}
    </Box>
  );
};
