import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface AuthState {
  user: { id?: string; name?: string; email?: string } | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  status: "idle",
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string }) => {
    const { data } = await api.post("/auth/register", payload);
    return data;
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.status = "loading";
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = "idle";
        s.token = a.payload.token;
        s.user = a.payload.user;
        localStorage.setItem("token", a.payload.token);
      })
      .addCase(login.rejected, (s, a) => {
        s.status = "failed";
        s.error = String(a.error.message);
      })
      .addCase(register.fulfilled, (s, a) => {
        s.token = a.payload.token;
        s.user = a.payload.user;
        s.status = "idle";
        localStorage.setItem("token", a.payload.token);
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
