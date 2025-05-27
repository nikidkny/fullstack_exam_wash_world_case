import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../screens/auth/authSlice";
import membershipPlanReducer from "../screens/auth/membershipPlans/membershipPlansSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    membershipPlans: membershipPlanReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
