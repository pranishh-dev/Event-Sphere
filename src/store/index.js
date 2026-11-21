import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./slices/favouritesSlice";
// import eventsReducer from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    // events: eventsReducer,
  },
});
