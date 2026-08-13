import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";

const storedSession = authService.getStoredSession();

const initialState = {
  isAuthenticated: Boolean(storedSession),
  admin: storedSession || null,
  status: "idle", // idle | loading | failed
  error: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const session = await authService.login(credentials);
      return session;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin(state) {
      authService.logout();
      state.isAuthenticated = false;
      state.admin = null;
      state.status = "idle";
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = true;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed.";
      });
  },
});

export const { logoutAdmin, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
