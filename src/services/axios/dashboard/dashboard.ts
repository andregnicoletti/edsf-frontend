import { createRequest, sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import {
  DashboardLinesChartData,
  DashboardLinesChartDataResponse,
  DashboardStackedColumnsChartData,
  DashboardStackedColumnsChartResponse,
  DetailedExtractResponseFilters,
  ExtractDetailedData,
  ListDetailedExtractResponse,
  PanelDataByIdResponse,
  PanelsListResponse,
  RequestSummaryExtractData,
  RequestSummaryExtractResponse,
} from "./dashboard.types";

import { parseExtractDetailedRequestData } from "@/services/parseData/parseExtractDetailed";
import { CityExtractDetailed } from "@/types/CityExtractDetailed";

export async function requestDetailedExtract(
  data: ExtractDetailedData
): Promise<{
  data: CityExtractDetailed[];
  filters: DetailedExtractResponseFilters;
}> {
  const response = await createRequest<ListDetailedExtractResponse>(
    API_ROUTES_PROTECTED.DASHBOARD_DETAILED_EXTRACT,
    data
  );

  if (response?.data) {
    const parsedData = parseExtractDetailedRequestData(response.data);
    return { data: parsedData, filters: response.filters };
  }
  return { data: [], filters: response.filters };
}

export async function requestSummaryExtract(data: RequestSummaryExtractData) {
  const response = await createRequest<RequestSummaryExtractResponse>(
    API_ROUTES_PROTECTED.DASHBOARD_SUMMARY_EXTRACT,
    data
  );

  return response.filter;
}

export async function requestPanelsList() {
  const response = await sendRequest<PanelsListResponse>(
    API_ROUTES_PROTECTED.PANELS_LIST
  );
  return response.data.panels;
}

export async function requestPanelById<T>(id: string) {
  const response = await sendRequest<PanelDataByIdResponse<T>>(
    `${API_ROUTES_PROTECTED.PANEL_BY_ID}/${id}`
  );

  return response.data.data;
}

export async function requestDashboardStackedBars(
  data: DashboardStackedColumnsChartData
) {
  const response = await createRequest<DashboardStackedColumnsChartResponse>(
    API_ROUTES_PROTECTED.DASHBOARD_STACKED_COLUMN_CHART,
    data
  );
  return response;
}

export async function requestDashboardLinesChart(
  data: DashboardLinesChartData
) {
  const response = await createRequest<DashboardLinesChartDataResponse>(
    API_ROUTES_PROTECTED.DASHBOARD_LINES_CHART,
    data
  );
  return response;
}
