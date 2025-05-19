import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../screens/auth/userSlice";
import locationsReducer from "../locations/locationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    locations: locationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
