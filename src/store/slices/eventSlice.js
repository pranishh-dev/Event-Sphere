import { createSlice } from "@reduxjs/toolkit";
import { toggleFavourite } from "./favouritesSlice";

const eventsSlice = +createSlice({
  name: "events",
  initialState: { events: JSON.parse(localStorage.getItem("eventsphere-explore-events")) || [] },
  reducers: {},
});

export default eventsSlice.reducer