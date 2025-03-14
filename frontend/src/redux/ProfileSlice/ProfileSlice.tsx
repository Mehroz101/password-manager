import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserProfileDetail } from "../../services/UserProfileService";

// Define the type for the profile state
interface ProfileState {
    userData: any; // Change 'any' to a specific type if you know the structure
    loading: boolean;
    error: string | null;
  }
  
const initialState: ProfileState = {
    userData: null,
    loading: false,
    error: null,
  };
  
// Async Thunk for fetching user profile data
export const getProfileData = createAsyncThunk(
  "profile/userdata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UserProfileDetail(); // Replace with actual API endpoint
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {}, // No local reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state) => {
        state.loading = true;
        state.error =null;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ProfileSlice.reducer;
