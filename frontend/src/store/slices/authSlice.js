import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";

const storedSession = authService.getStoredSession();

const initialState = {
  isAuthenticated: Boolean(storedSession?.token),
  admin: storedSession || null,
  status: storedSession?.token ? "checking" : "idle",
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

export const validateAdminSession = createAsyncThunk(
  "auth/validateSession",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.validateSession();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAdminIdentity(state, action) {
      state.admin = { ...state.admin, ...action.payload };
    },
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
      })
      .addCase(validateAdminSession.pending, (state) => {
        state.status = "checking";
      })
      .addCase(validateAdminSession.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = Boolean(action.payload);
        state.admin = action.payload;
      })
      .addCase(validateAdminSession.rejected, (state) => {
        state.status = "idle";
        const session = authService.getStoredSession();
        state.isAuthenticated = Boolean(session?.token);
        state.admin = session;
      });
  },
});

export const { logoutAdmin, clearAuthError, updateAdminIdentity } = authSlice.actions;
export default authSlice.reducer;
