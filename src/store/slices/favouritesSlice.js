import { createSlice } from "@reduxjs/toolkit";

export const checkIndexFav = (items, event) => {
  const index = items.findIndex(
    (e) => (e.id || e._id) == (event.id || event._id),
  );
  return index;
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    items: JSON.parse(localStorage.getItem("eventsphere-favourites")) || [],
  },
  reducers: {
    clearFavourites(state) {
      state.items = [];
      localStorage.setItem("eventsphere-favourites", JSON.stringify([]));
    },

    toggleFavourite(state, action) {
      let favourites = state.items;
      let event = action.payload;
      let index = checkIndexFav(favourites, event);

      if (index >= 0) {
        favourites.splice(index, 1);
      } else {
        favourites.push(event);
      }
      
      localStorage.setItem(
        "eventsphere-favourites",
        JSON.stringify(favourites),
      );

      // const isExist = favourites.find(
      //   (e) => (e.id || e._id) == (event.id || event._id),
      // );
      // console.log(isExist);
    },
  },
});

export const { clearFavourites, toggleFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
