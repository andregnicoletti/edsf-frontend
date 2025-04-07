import { createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "@/services/axios";

export const fetchCitiesThunk = createAsyncThunk(
  "cities/fetchCitiesThunk",
  async (_: void, thunkAPI) => {
    try {
      const response = await apiService.requestCities();
      return response;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);
