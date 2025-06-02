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
    // console.log('Fetching cards for user ID in cardSlice:', userId);
    try {
      const card = await CardAPI.getCardsByUserId(userId);
      // console.log('Fetched cards:', card);
      // console.log('Fetched cards length:', card.length);
      return card;
    } catch (error) {
      console.error('Error fetching card:', error);
      return thunkAPI.rejectWithValue('Failed to fetch cards');
    }
  }
);

export const updateCard = createAsyncThunk(
  'card/updateCard',
  async ({ id, cardDto }: { id: number; cardDto: CreateCardDto }, thunkAPI) => {
    try {
      const response = await CardAPI.updateCard(id, cardDto);
      return response;
    } catch (error) {
      console.error('Error updating card:', error);
      return thunkAPI.rejectWithValue('Failed to update card');
    }
  }
);

export const deleteCard = createAsyncThunk('card/deleteCard', async (cardId: number, thunkAPI) => {
  try {
    const response = await CardAPI.deleteCard(cardId);
    return response;
  } catch (error) {
    console.error('Error deleting card:', error);
    return thunkAPI.rejectWithValue('Failed to delete card');
  }
});
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
        console.log('Card created successfully:', action.payload);
        state.loading = false;
        state.cards.push(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        console.error('Error creating card:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCardsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCardsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = action.payload;
      })
      .addCase(getCardsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cards = [];
      })
      .addCase(updateCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cards.findIndex((card) => card.id === action.payload.id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards = state.cards.filter((card) => card.id !== action.payload.id);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { actions, reducer } = cardSlice;
export default cardSlice.reducer;
