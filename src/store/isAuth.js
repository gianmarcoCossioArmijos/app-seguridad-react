import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("token");

export const isAuthSlice = createSlice({
  name: "isauth",
  initialState,
  reducers: {
    login: () => {
      const token = localStorage.getItem("token");
      return token;
    },
    logout: () => {
      const token = "";
      localStorage.setItem("token", "");
      return token;
    },
  },
});

export default isAuthSlice.reducer;
export const { login, logout } = isAuthSlice.actions;
