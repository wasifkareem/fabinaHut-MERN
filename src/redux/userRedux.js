import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "newUser",
  initialState: {
    initialState,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },

    logout: () => initialState,
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
