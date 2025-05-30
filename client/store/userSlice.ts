import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UsersAPI } from '../screens/auth/users/userApi';

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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        // Transform the data from the database into the desired format
        const user = action.payload;
        state.data = {
          firstName: user.first_name || '',
          lastName: user.last_name || '',
          email: user.email || '',
          phoneNumber: user.phone_number || '',
          userId: user.id || null,
        };
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
