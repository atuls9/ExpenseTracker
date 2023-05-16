import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: "",
  isProfileCompleted: false,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.token = localStorage.getItem("token");
      console.log(" token", localStorage.getItem("token"));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    profileCompleted(state) {
      state.isProfileCompleted = true;
    },
  },
});

export const authActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
