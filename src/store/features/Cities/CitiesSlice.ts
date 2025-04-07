import { createSlice } from "@reduxjs/toolkit";

import { fetchCitiesThunk } from "./CitiesThunk";

import { City } from "@/types/City";
import { State } from "@/types/State";

type CitiesState = {
  cities: City[];
  states: State[];
  citiesLoading: boolean;
};

const initialState: CitiesState = {
  cities: [],
  states: [],
  citiesLoading: false,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
    builder.addCase(fetchCitiesThunk.fulfilled, (state, action) => {
      const cities = action.payload || [];
      const statesStrings = [...new Set(cities.map((city) => city.state_id))];
      const statesStringsOrdered = [...statesStrings].sort((a, b) =>
        a.localeCompare(b)
      );
      state.states = statesStringsOrdered.map((item) => ({ state_id: item }));
      state.cities = cities;
      state.citiesLoading = false;
    });
    builder.addCase(fetchCitiesThunk.pending, (state) => {
      state.citiesLoading = true;
    });
    builder.addCase(fetchCitiesThunk.rejected, (state) => {
      state.citiesLoading = false;
    });
  },
  reducers: {},
});

export const citiesSliceActions = citiesSlice.actions;
