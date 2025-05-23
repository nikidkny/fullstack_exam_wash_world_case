import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { MembershipPlanDto } from './membershipPlansDto';
import { MembershipPlansAPI } from './membershipPlansApi';

interface MembershipPlanState {
  membershipPlans: MembershipPlanDto | MembershipPlanDto[] | null;
  error: string | null;
}

// Initial state
const initialState: MembershipPlanState = {
  membershipPlans: null,
  error: null,
};

// Async thunk for fetching all membership plans
export const getAll = createAsyncThunk(
  'membershipPlans/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await MembershipPlansAPI.getAll();
      
      return response.data;
    } catch (error) {
      console.error('Fetching error:', error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error while fetching membership plans');
    }
  }
);

// Slice
const membershipPlansSlice = createSlice({
  name: 'membershipPlans',
  initialState,
  reducers: {
    clearMembershipPlans: (state) => {
      state.membershipPlans = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action: PayloadAction<MembershipPlanDto[]>) => {
        state.membershipPlans = action.payload;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearMembershipPlans } = membershipPlansSlice.actions;
export default membershipPlansSlice.reducer;
