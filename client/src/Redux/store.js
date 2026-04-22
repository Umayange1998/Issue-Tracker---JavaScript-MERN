import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice";
import searchSlice from "./Slices/searchSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
  },

  devTools: import.meta.env.NODE_ENV !== "production",
});
export default store;
