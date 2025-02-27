import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Auth State Type
interface AuthState {
  isAuth: boolean;
  user: null | object;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: AuthState = {
  isAuth: !!localStorage.getItem("passwordmanager"),
  user: null,
  token: localStorage.getItem("passwordmanager") || null,
  loading: false,
  error: null,
};

// Async thunk to check if user is logged in
export const CheckUser = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/checkUser", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("passwordmanager");

    if (token) {
      return token; // Directly return the token as a string
    } else {
      return rejectWithValue("No token found");
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return rejectWithValue("An error occurred while checking login status");
  }
});

// Auth Slice
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("passwordmanager");
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CheckUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CheckUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isAuth = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(
        CheckUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.isAuth = false;
          state.token = null;
          state.error = action.payload ?? "Unknown error occurred"; // Ensures error is always a string
        }
      );
  },
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;
