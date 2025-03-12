import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice/AuthSlice";
import ProfileSlice from "./ProfileSlice/ProfileSlice";
export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    profile:ProfileSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
