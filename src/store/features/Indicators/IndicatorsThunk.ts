import { createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "@/services/axios";

export const fetchIndicatorsThunk = createAsyncThunk(
  "indicators/fetchIndicatorsThunk",
  async (_: void, thunkAPI) => {
    try {
      const response = await apiService.requestIndicators();
      return response;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);
