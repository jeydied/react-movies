import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "constants/tokens";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: { authenticated: ACCESS_TOKEN ? true : false },
  reducers: {
    login: (state) => {
      state.authenticated = true;
    },
    logout: (state) => {
      state.authenticated = false;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
