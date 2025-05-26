import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { CreateUserDto } from './users/createUserDto';
import { UsersAPI } from './users/userApi';

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

export const checkUserEmail = createAsyncThunk(
    'auth/email',
    async (email: string, thunkAPI) => {
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
    }
);

// Create user slice
const authSlice = createSlice({
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
            .addCase(checkUserEmail.pending, (state) => {
                state.error = null;
            })
            .addCase(checkUserEmail.fulfilled, (state, action) => {
                state.error = null;
            })
            .addCase(checkUserEmail.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

// Export actions and reducer
export const { reloadJwtFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;
