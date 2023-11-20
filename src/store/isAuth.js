import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("token") || "";

export const isAuthSlice = createSlice({
  name: "isauth",
  initialState,
  reducers: {
    login: (state) => {
      const token = JSON.stringify(state);
      localStorage.setItem("token",JSON.stringify(state));
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
