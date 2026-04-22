import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  fullName: null,
  email: null,
  role: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, fullName, email, role, token } = action.payload;
      state._id = _id;
      state.fullName = fullName;
      state.email = email;
      state.role = role;
      state.token = token;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state._id = null;
      state.fullName = null;
      state.email = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
