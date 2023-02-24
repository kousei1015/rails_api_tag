import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../components/features/authSlice";
import postReducer from "../components/features/postSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
