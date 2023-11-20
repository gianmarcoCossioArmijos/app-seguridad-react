import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "../store/menuSlice.js";
import isAuth from "./isAuth.js";

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    isauth: isAuth
  },
});
