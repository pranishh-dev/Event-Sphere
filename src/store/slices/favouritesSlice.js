import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { count: 0, isFavourite: false },
  reducers: {
    clearFavourites() {},
    toggleFavourite(state, action) {
      state.isFavourite = !state.isFavourite;
      console.log(state.isFavourite);
    },
    removeFavourite() {},
  },
});

export const { clearFavourites, toggleFavourite, removeFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
