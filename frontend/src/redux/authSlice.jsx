import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const initialState = {
  user: null,
  isAuthenticated: !!token,
  /*If token exists in cookies → true (user is logged in).
                             If no token → false (user is not logged in). */ loading: false,
  isVerified: false,
  isAdmin: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.isVerified = user.isVerified;
      state.isAdmin = user.isAdmin;
      state.loading = false;
    },
    verifyotpSuccess(state) {
      state.isVerified = true;
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    authFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  authFailure,
  authRequest,
  authSuccess,
  verifyotpSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
