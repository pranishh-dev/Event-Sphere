import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    query: "",
    priceFormat: "all",
    statusFormat: "all",
    sortFormat: "latest",
    city: "all",
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSelectedPriceFormat(state, action) {
      state.priceFormat = action.payload;
    },
    setSelectedStatusFormat(state, action) {
      state.statusFormat = action.payload;
    },
    setSelectedSortFormat(state, action) {
      state.sortFormat = action.payload;
    },
    setSelectedCity(state, action) {
      state.city = action.payload;
    },
  },
});
export const {
  setQuery,
  setSelectedPriceFormat,
  setSelectedStatusFormat,
  setSelectedSortFormat,
  setSelectedCity,
} = filtersSlice.actions;

export default filtersSlice.reducer;
