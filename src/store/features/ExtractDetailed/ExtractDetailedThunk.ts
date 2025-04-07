import { createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "@/services/axios";
import { ExtractDetailedData } from "@/services/axios/dashboard/dashboard.types";

export const fetchDetailedExtractThunk = createAsyncThunk(
  "extractDetailed/fetchDetailedExtractThunk",
  async (data: ExtractDetailedData, thunkAPI) => {
    try {
      const response = await apiService.requestDetailedExtract(data);
      return response;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);
