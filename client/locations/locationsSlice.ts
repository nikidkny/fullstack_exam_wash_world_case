// src/features/locations/locationSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationEntity } from "./locationEntity";
import { LocationsAPI } from "./locationsAPI";

// Thunks
export const fetchLocations = createAsyncThunk("locations/fetchAll", async () => {
  return await LocationsAPI.getLocations();
});

export const createLocation = createAsyncThunk("locations/create", async (location: LocationEntity) => {
  return await LocationsAPI.createLocation(location);
});

export const removeLocation = createAsyncThunk("locations/delete", async (id: number) => {
  return await LocationsAPI.removeLocation(id);
});

// State
interface LocationState {
  locations: LocationEntity[];
  errormessage: string;
}

const initialState: LocationState = {
  locations: [],
  errormessage: "",
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      console.log("payload for locations", action.payload);
      state.locations = action.payload;
    });

    builder.addCase(createLocation.fulfilled, (state, action) => {
      state.locations.push(action.payload);
      state.errormessage = "";
    });

    builder.addCase(removeLocation.fulfilled, (state, action) => {
      state.locations = state.locations.filter((location) => location.id !== action.payload);
      state.errormessage = "";
    });

    builder.addCase(removeLocation.rejected, (state) => {
      state.errormessage = "Error deleting location";
    });

    builder.addCase(createLocation.rejected, (state) => {
      state.errormessage = "Error creating location";
    });
  },
});

export default locationSlice.reducer;
