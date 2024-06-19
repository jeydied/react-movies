export interface SliderProps {
  releaseYears: number[];
  onReleaseYearsChange: (e: Event, newValue: number | number[]) => void;
}
