import { createSlice } from "@reduxjs/toolkit";
import { toggleFavourite } from "./favouritesSlice";

const eventsSlice = +createSlice({
  name: "events",
  initialState: { events: [] },
  reducers: {},
});

export default eventsSlice.reducer