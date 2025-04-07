import { createSlice } from "@reduxjs/toolkit";

import { fetchIndicatorsThunk } from "./IndicatorsThunk";

import { RequestIndicatorItem } from "@/services/axios/indicators/indicators.types";

type IndicatorsState = {
  indicators: Array<RequestIndicatorItem>;
  indicatorsLoading: boolean;
};

const initialState: IndicatorsState = {
  indicators: [],
  indicatorsLoading: false,
};

export const indicatorsSlice = createSlice({
  name: "indicators",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
    builder.addCase(fetchIndicatorsThunk.fulfilled, (state, action) => {
      state.indicators = action.payload || [];
    });
    builder.addCase(fetchIndicatorsThunk.pending, (state) => {
      state.indicatorsLoading = true;
    });
    builder.addCase(fetchIndicatorsThunk.rejected, (state) => {
      state.indicatorsLoading = false;
    });
  },
  reducers: {},
});

export const indicatorsSliceActions = indicatorsSlice.actions;
