import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../screens/auth/authSlice';
import membershipPlanReducer from '../screens/auth/membershipPlans/membershipPlansSlice';
import cardReducer from './cardSlice';
import locationsReducer from '../locations/locationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    membershipPlans: membershipPlanReducer,
    card: cardReducer,
    locations: locationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
