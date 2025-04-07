import { createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "@/services/axios";
import { RequestSummaryExtractData } from "@/services/axios/dashboard/dashboard.types";

export const fetchSummaryExtractThunk = createAsyncThunk(
  "extractSummary/fetchSummaryExtractThunk",
  async (data: RequestSummaryExtractData, thunkAPI) => {
    try {
      const response = await apiService.requestSummaryExtract(data);
      return response;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);
