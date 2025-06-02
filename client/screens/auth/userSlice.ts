import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { CreateUserDto } from "./createUserDto";
import { UsersAPI } from "./userApi";

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
export const signup = createAsyncThunk("auth/signup", async (createUserDto: CreateUserDto, thunkAPI) => {
  try {
    const data = await UsersAPI.signup(createUserDto);

    return data;
  } catch (error) {
    console.error("Signup error:", error);
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reloadJwtFromStorage: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      SecureStore.deleteItemAsync("userToken");
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
      });
  },
});

// Export actions and reducer
export const { reloadJwtFromStorage, logout } = userSlice.actions;
export default userSlice.reducer;
