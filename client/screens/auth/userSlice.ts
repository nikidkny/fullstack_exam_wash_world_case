import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { CreateUserDto } from './createUserDto';
import { UsersAPI } from './users/userApi';
import { createCardDto } from '@/screens/cards/createCardDto';
import { LoginUserDto } from './users/loginUserDto';

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
      const response = await UsersAPI.signup(createUserDto);

      return response;
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error while signup');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (loginUserDto: LoginUserDto, thunkAPI) => {
    try {
      const response = await UsersAPI.login(loginUserDto);

      return response;
    } catch (error) {
      // console.log('Login error:', error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error while login');
    }
  }
);

export const checkUserEmail = createAsyncThunk('auth/email', async (email: string, thunkAPI) => {
  try {
    const response = await UsersAPI.checkUserEmail(email);

    // If response is undefined, user doesn't exist → allow signup
    if (response === undefined) {
      return null;
    }

    return thunkAPI.rejectWithValue(`User with email ${email} already exists`);
  } catch (error) {
    console.error('checkUserEmail error:', error);
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error while checking email');
  }
});

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
    { userId, userData }: { userId: number; userData: Partial<CreateUserDto> },
    { rejectWithValue }
  ) => {
    try {
      const response = await UsersAPI.updateUserById(userId, userData);
      // console.log('Updated user in thunk:', response.data);
      return response.data; // return only the data fields
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
      SecureStore.deleteItemAsync('jwt');
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
      .addCase(checkUserEmail.pending, (state) => {
        state.error = null;
      })
      .addCase(checkUserEmail.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(checkUserEmail.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { access_token, user } = action.payload.data;
        if (access_token && user) {
          // console.log(access_token);
          // console.log(user);

          SecureStore.setItemAsync('jwt', access_token);
          state.token = access_token;
          state.user = user;
          state.error = null;
        } else {
          state.error = 'Invalid login response';
        }
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
      .addCase(updateUserById.fulfilled, (state, action: PayloadAction<Partial<CreateUserDto>>) => {
        state.user = action.payload;
        // console.log('User updated in slice:', state.user);
        state.error = null;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        console.error('Update user rejected with:', action.payload);
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
