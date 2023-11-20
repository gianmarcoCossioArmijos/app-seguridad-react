import { createSlice } from "@reduxjs/toolkit";

const initialState = "close";

export const menuSlice = createSlice({
  name: "close",
  initialState,
  reducers: {
    hidde: () => {
      const menu = "close";
      return menu;
    },
    show: () => {
      const menu = "open";
      return menu;
    },
  },
});

export default menuSlice.reducer;
export const { hidde, show } = menuSlice.actions;
