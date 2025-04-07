import { createSlice } from "@reduxjs/toolkit";

import { fetchCoursesThunk } from "./CoursesThunk";

import { Course } from "@/types/Course";

type CoursesState = {
  courses: Course[];
  coursesLoading: boolean;
};

const initialState: CoursesState = {
  courses: [],
  coursesLoading: false,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
    builder.addCase(fetchCoursesThunk.fulfilled, (state, action) => {
      state.courses = action.payload || [];
      state.coursesLoading = false;
    });
    builder.addCase(fetchCoursesThunk.pending, (state) => {
      state.coursesLoading = true;
    });
    builder.addCase(fetchCoursesThunk.rejected, (state) => {
      state.coursesLoading = false;
    });
  },
  reducers: {},
});

export const coursesSliceActions = coursesSlice.actions;
