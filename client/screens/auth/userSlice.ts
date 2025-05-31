import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { CreateUserDto } from './createUserDto';
import { UsersAPI } from './userApi';
import { createCardDto } from '@/screens/cards/createCardDto';

interface UserState {
  token: string | null;
  user: CreateUserDto | null;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  token: null,
  user: null,
  error: null,
};

// Async thunk for user signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (createUserDto: CreateUserDto, thunkAPI) => {
    try {
      const data = await UsersAPI.signup(createUserDto);

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const user = await UsersAPI.getUserById(userId);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user');
    }
  }
);

export const updateUserById = createAsyncThunk(
  'user/updateUserById',
  async (
    { userId, userData }: { userId: number; userData: createCardDto },
    { rejectWithValue }
  ) => {
    try {
      const updatedUser = await UsersAPI.updateUserById(userId, userData);
      return updatedUser;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update user');
    }
  }
);

export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async (userId: number, { rejectWithValue }) => {
    try {
      await UsersAPI.deleteUserById(userId);
      return userId; // Return the userId to remove it from the state
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to delete user');
    }
  }
);

// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      SecureStore.deleteItemAsync('userToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateUserById.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action: PayloadAction<CreateUserDto>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action: PayloadAction<number>) => {
        state.user = null; // Clear user data on deletion
        state.error = null;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { reloadJwtFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;
