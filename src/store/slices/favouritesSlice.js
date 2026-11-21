import { createSlice } from "@reduxjs/toolkit";


export const checkIndexFav=(items,event)=>{
  const index = items.findIndex(
        (e) =>
          (e.id || e._id) == (event.id || event._id),
      );
  return index
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState:{items:[]},
  reducers: {
    clearFavourites(state) {
      state.items=[]
    },
    toggleFavourite(state, action) {
      
      let index = checkIndexFav(state.items,action.payload)
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }

      // const isExist = state.items.find(
      //   (e) => (e.id || e._id) == (action.payload.id || action.payload._id),
      // );
      // console.log(isExist);
    }
  }
});

export const { clearFavourites, toggleFavourite } =
  favouritesSlice.actions;

export default favouritesSlice.reducer;
