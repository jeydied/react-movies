import * as Cookies from "js-cookie";

export const INITIAL = 0;
export const DEFAULT_PAGE = 1;
export const VOTE_MULTIPLIER = 10;
export const ALERT_DELAY = 3000;
export const RELEASE_YEAR_START = 1900;
export const RELEASE_YEAR_END = 2025;
export const AUTHORIZATION_DELAY = 1000;
export const LOW_RATING = 5;
export const MEDIUM_RATING = 7;
export const RUNTIME_DIVIDER = 60;
export const MAIN_CAST_MAX = 4;
export const USER_ID = Cookies.default.get("userId");
export const RELEASE_YEAR_GTE_INDEX = 0;
export const RELEASE_YEAR_LTE_INDEX = 1;
