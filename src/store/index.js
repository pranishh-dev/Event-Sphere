import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./slices/favouritesSlice";
import filtersReducer from "./slices/filterSlice"
// import eventsReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    filters:filtersReducer,
    // events: eventsReducer,
  },
});
