import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { fetchDetailedExtractThunk } from "./ExtractDetailedThunk";

import { parseDetailedRequestToFilters } from "@/services/parseData/parseFilters";
import { City } from "@/types/City";
import { CityExtractDetailed } from "@/types/CityExtractDetailed";
import { Course } from "@/types/Course";
import { State } from "@/types/State";

type CityExtractDetailedStatus = {
  allCities: Array<City>;
  extractDetailedData: CityExtractDetailed[];
  extractDetailedFilters: {
    citiesFilterOptions: Array<City>;
    citiesSelectedIds: Array<string>;
    statesFilterOptions: Array<State>;
    statesSelectedIds: Array<string>;
    coursesFilterOptions: Array<Course>;
    coursesSelectedCodes: Array<string>;
    visualizationOptions: ["Mais inscritos", "Menos inscritos"];
    visualizationSelected: "Mais inscritos" | "Menos inscritos";
    dateFrom: string;
    dateTo: string;
  };
  extractDetailedLoading: boolean;
};

const initialState: CityExtractDetailedStatus = {
  allCities: [],
  extractDetailedData: [],
  extractDetailedFilters: {
    citiesFilterOptions: [],
    citiesSelectedIds: [],
    statesFilterOptions: [],
    statesSelectedIds: [],
    coursesFilterOptions: [],
    coursesSelectedCodes: [],
    visualizationOptions: ["Mais inscritos", "Menos inscritos"],
    visualizationSelected: "Mais inscritos",
    dateFrom: dayjs().toString(),
    dateTo: dayjs().toString(),
  },
  extractDetailedLoading: false,
};

export const extractDetailedSlice = createSlice({
  name: "extractDetailed",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
    builder.addCase(fetchDetailedExtractThunk.pending, (state) => {
      state.extractDetailedLoading = true;
    });
    builder.addCase(fetchDetailedExtractThunk.fulfilled, (state, action) => {
      state.extractDetailedData = action.payload?.data || [];
      state.extractDetailedLoading = false;
      if (!action.payload) return;

      const { cities, states, courses } = parseDetailedRequestToFilters(
        action.payload?.filters,
        state.allCities
      );

      state.extractDetailedFilters.citiesFilterOptions = cities;
      state.extractDetailedFilters.statesFilterOptions = states;
      state.extractDetailedFilters.coursesFilterOptions = courses;
    });
    builder.addCase(fetchDetailedExtractThunk.rejected, (state) => {
      state.extractDetailedLoading = false;
    });
  },
  reducers: {
    addCityExtractDetailedData: (
      state,
      action: PayloadAction<CityExtractDetailed[]>
    ) => {
      state.extractDetailedData = action.payload;
    },
    changeCitySelectedIds: (state, action: PayloadAction<Array<string>>) => {
      state.extractDetailedFilters.citiesSelectedIds = action.payload;
    },
    changeStateSelectedIds: (state, action: PayloadAction<Array<string>>) => {
      state.extractDetailedFilters.statesSelectedIds = action.payload;
    },
    changeCourseSelectedIds: (state, action: PayloadAction<Array<string>>) => {
      state.extractDetailedFilters.coursesSelectedCodes = action.payload;
    },
    changeVisualizationOption: (
      state,
      action: PayloadAction<"Mais inscritos" | "Menos inscritos">
    ) => {
      state.extractDetailedFilters.visualizationSelected = action.payload;
    },
    changeDateFrom: (state, action: PayloadAction<string>) => {
      state.extractDetailedFilters.dateFrom = action.payload;
    },
    changeDateTo: (state, action: PayloadAction<string>) => {
      state.extractDetailedFilters.dateTo = action.payload;
    },
    cleanFilters: (state) => {
      state.extractDetailedFilters.citiesSelectedIds = [];
      state.extractDetailedFilters.statesSelectedIds = [];
      state.extractDetailedFilters.coursesSelectedCodes = [];
      state.extractDetailedFilters.visualizationSelected = "Mais inscritos";
      state.extractDetailedFilters.dateFrom = dayjs().toString();
      state.extractDetailedFilters.dateTo = dayjs().toString();
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.extractDetailedLoading = action.payload;
    },
    changeAllCities: (state, action: PayloadAction<Array<City>>) => {
      state.allCities = action.payload;
    },
  },
});

export const extractDetailedSliceActions = extractDetailedSlice.actions;
