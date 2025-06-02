import { configureStore } from '@reduxjs/toolkit';
import membershipPlanReducer from '../screens/auth/membershipPlans/membershipPlansSlice';
import cardReducer from './cardSlice';
import locationsReducer from '../locations/locationsSlice';
import userReducer from '../screens/auth/userSlice';

export const store = configureStore({
  reducer: {
    membershipPlans: membershipPlanReducer,
    card: cardReducer,
    locations: locationsReducer,
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
