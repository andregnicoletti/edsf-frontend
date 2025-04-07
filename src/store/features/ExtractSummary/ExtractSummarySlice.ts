import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { fetchSummaryExtractThunk } from "./ExtractSummaryThunk";

import { RequestSummaryExtractResponseData } from "@/services/axios/dashboard/dashboard.types";
import { parseSummaryRequestToFilters } from "@/services/parseData/parseFilters";
import { City } from "@/types/City";
import { Indicator } from "@/types/ConfigNewPanel";
import { Course } from "@/types/Course";
import { Producer } from "@/types/Producer";
import { State } from "@/types/State";

type CityExtractSummaryStatus = {
  allCities: Array<City>;
  extractSummaryFilters: {
    indicatorsFilterOptions: Array<Indicator>;
    citiesFilterOptions: Array<City>;
    statesFilterOptions: Array<State>;
    coursesFilterOptions: Array<Course>;
    producersFilterOptions: Array<Producer>;
    indicatorsSelectedCodes: Array<string>;
    citiesSelectedIds: Array<string>;
    statesSelectedIds: Array<string>;
    coursesSelectedCodes: Array<string>;
    producersSelectedCodes: Array<string>;
    dateFrom: string;
    dateTo: string;
  };
  extractSummaryLoading: boolean;
  extractSummaryData?: RequestSummaryExtractResponseData;
};

const initialState: CityExtractSummaryStatus = {
  allCities: [],
  extractSummaryFilters: {
    indicatorsFilterOptions: [],
    citiesFilterOptions: [],
    statesFilterOptions: [],
    coursesFilterOptions: [],
    producersFilterOptions: [],
    indicatorsSelectedCodes: [],
    citiesSelectedIds: [],
    statesSelectedIds: [],
    coursesSelectedCodes: [],
    producersSelectedCodes: [],
    dateFrom: dayjs().toString(),
    dateTo: dayjs().toString(),
  },
  extractSummaryLoading: true,
};

export const extractSummarySlice = createSlice({
  name: "extractSummary",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("userSlice/logout", () => initialState);
    builder.addCase(fetchSummaryExtractThunk.pending, (state) => {
      state.extractSummaryLoading = true;
    });
    builder.addCase(fetchSummaryExtractThunk.fulfilled, (state, action) => {
      state.extractSummaryLoading = false;
      state.extractSummaryData = action.payload?.data;
      if (!action.payload) return;

      const { indicators, cities, states, courses, producers } =
        parseSummaryRequestToFilters(action.payload.filters, state.allCities);

      state.extractSummaryFilters.indicatorsFilterOptions = indicators;
      state.extractSummaryFilters.citiesFilterOptions = cities;
      state.extractSummaryFilters.statesFilterOptions = states;
      state.extractSummaryFilters.coursesFilterOptions = courses;
      state.extractSummaryFilters.producersFilterOptions = producers;
    });
    builder.addCase(fetchSummaryExtractThunk.rejected, (state) => {
      state.extractSummaryLoading = false;
    });
  },
  reducers: {
    changeIndicatorSelectedIds: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      state.extractSummaryFilters.indicatorsSelectedCodes = action.payload;
    },
    changeCitySelectedIds: (state, action: PayloadAction<Array<string>>) => {
      state.extractSummaryFilters.citiesSelectedIds = action.payload;
    },
    changeStateSelectedIds: (state, action: PayloadAction<Array<string>>) => {
      state.extractSummaryFilters.statesSelectedIds = action.payload;
    },
    changeCourseSelectedIds: (state, action: PayloadAction<Array<string>>) => {
      state.extractSummaryFilters.coursesSelectedCodes = action.payload;
    },
    changeProducerSelectedIds: (
      state,
      action: PayloadAction<Array<string>>
    ) => {
      state.extractSummaryFilters.producersSelectedCodes = action.payload;
    },
    changeDateFrom: (state, action: PayloadAction<string>) => {
      state.extractSummaryFilters.dateFrom = action.payload;
    },
    changeDateTo: (state, action: PayloadAction<string>) => {
      state.extractSummaryFilters.dateTo = action.payload;
    },
    cleanFilters: (state) => {
      state.extractSummaryFilters.indicatorsSelectedCodes = [];
      state.extractSummaryFilters.citiesSelectedIds = [];
      state.extractSummaryFilters.statesSelectedIds = [];
      state.extractSummaryFilters.coursesSelectedCodes = [];
      state.extractSummaryFilters.producersSelectedCodes = [];
      state.extractSummaryFilters.dateFrom = dayjs().toString();
      state.extractSummaryFilters.dateTo = dayjs().toString();
    },
    changeAllCities: (state, action: PayloadAction<Array<City>>) => {
      state.allCities = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.extractSummaryLoading = action.payload;
    },
  },
});

export const extractSummarySliceActions = extractSummarySlice.actions;
