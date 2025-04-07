import { combineReducers } from "@reduxjs/toolkit";

import { citiesSlice } from "./features/Cities/CitiesSlice";
import { configNewPanelSlice } from "./features/ConfigNewPanel/ConfigNewPanelSlice";
import { configsSlice } from "./features/Configs/configsSlice";
import { coursesSlice } from "./features/Courses/CoursesSlice";
import { extractDetailedSlice } from "./features/ExtractDetailed/ExtractDetailedSlice";
import { extractSummarySlice } from "./features/ExtractSummary/ExtractSummarySlice";
import { fileLoadDetailsSlice } from "./features/FileLoadDetails/FileLoadDetailsSlice";
import { indicatorsSlice } from "./features/Indicators/IndicatorsSlice";
import { snackbarSlice } from "./features/Snackbar/SnackbarSlice";
import { userSlice } from "./features/User/userSlice";

export const rootReducer = combineReducers({
  fileLoadDetails: fileLoadDetailsSlice.reducer,
  snackbar: snackbarSlice.reducer,
  configs: configsSlice.reducer,
  user: userSlice.reducer,
  extractDetailed: extractDetailedSlice.reducer,
  extractSummary: extractSummarySlice.reducer,
  cities: citiesSlice.reducer,
  courses: coursesSlice.reducer,
  configNewPanel: configNewPanelSlice.reducer,
  indicators: indicatorsSlice.reducer,
});
