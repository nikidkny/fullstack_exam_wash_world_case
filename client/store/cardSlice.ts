import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CardAPI } from '../screens/cards/cardApi';
import { createCardDto } from '../screens/cards/createCardDto';

export const createCard = createAsyncThunk(
  'card/createCard',
  async (createCardDto: createCardDto, thunkAPI) => {
    try {
      const card = await CardAPI.createCard(createCardDto);
      return card;
    } catch (error) {
      console.error('Error creating card:', error);
      return thunkAPI.rejectWithValue('Failed to create card');
    }
  }
);

export const getCardsByUserId = createAsyncThunk(
  'card/getCardsByUserId',
  async (userId: number, thunkAPI) => {
    try {
      const card = await CardAPI.getCardsByUserId(userId);
      return card;
    } catch (error) {
      console.error('Error fetching card:', error);
      return thunkAPI.rejectWithValue('Failed to fetch cards');
    }
  }
);

export const createCardByUserId = createAsyncThunk(
  'card/createCardByUserId',
  async ({ userId, createCardDto }, thunkAPI) => {
    try {
      const card = await CardAPI.createCardByUserId(userId, createCardDto);
      return card;
    } catch (error) {
      console.error('Error creating card:', error);
      return thunkAPI.rejectWithValue('Failed to create card');
    }
  }
);

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCardsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload || [];
      })
      .addCase(getCardsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cards = [];
      })
      .addCase(createCardByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCardByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload);
      })
      .addCase(createCardByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { actions, reducer } = cardSlice;
export default cardSlice.reducer;
