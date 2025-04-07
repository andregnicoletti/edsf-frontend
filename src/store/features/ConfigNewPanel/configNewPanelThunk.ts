import { createAsyncThunk } from "@reduxjs/toolkit";

import apiService from "@/services/axios";
import {
  DatasetPreviewChartPanel,
  DatasetPreviewTablePanel,
  SendPanelPreviewData,
} from "@/services/axios/configNewPanel/configNewPanel.types";
import {
  parseNewPanelPreviewToChart,
  parseNewPanelPreviewToTable,
} from "@/services/parseData/parseNewPanel";

export const fetchIndicatorThunk = createAsyncThunk(
  "configNewPanel/fetchIndicatorThunk",
  async (_: void, thunkAPI) => {
    try {
      const response = await apiService.getInticator();
      return response;
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);

export const fetchNewPanelPreview = createAsyncThunk(
  "configNewPanel/fetchNewPanelPreview",
  async (data: SendPanelPreviewData, thunkAPI) => {
    try {
      if (data.panelType === "bar_chart") {
        const response =
          await apiService.sendPanelPreview<DatasetPreviewChartPanel>(data);
        const parsedToChart = parseNewPanelPreviewToChart(response);
        return {
          chartData: parsedToChart,
          producersOptions: response.producers,
        };
      } else if (data.panelType === "table") {
        const response =
          await apiService.sendPanelPreview<DatasetPreviewTablePanel>(data);
        const parsedToTable = parseNewPanelPreviewToTable(response.datasets);
        return {
          tableData: parsedToTable,
          producersOptions: response.producers,
        };
      }
    } catch {
      thunkAPI.rejectWithValue("error");
    }
  }
);
