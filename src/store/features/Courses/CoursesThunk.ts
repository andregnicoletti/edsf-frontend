import { createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "@/services/axios";

export const fetchCoursesThunk = createAsyncThunk(
  "courses/fetchCoursesThunk",
  async (_, thunkAPI) => {
    try {
      const response = await apiService.requestCourses();
      return response;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);
