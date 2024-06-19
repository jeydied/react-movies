import { Box, Slider as MUISlider, Typography } from "@mui/joy";
import { RELEASE_YEAR_END, RELEASE_YEAR_START } from "constants/numbers";
import { SliderProps } from "./slider.types";
import styles from "./slider.module.css";

export const Slider: React.FC<SliderProps> = ({
  releaseYears,
  onReleaseYearsChange,
}) => {
  return (
    <Box className={styles.slider}>
      <Typography level="body-md" className={styles.title}>
        Release years:
      </Typography>
      <MUISlider
        value={releaseYears}
        onChange={onReleaseYearsChange}
        min={RELEASE_YEAR_START}
        max={RELEASE_YEAR_END}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};
