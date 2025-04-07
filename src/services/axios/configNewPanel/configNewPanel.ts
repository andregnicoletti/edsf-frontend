import {
  createRequest,
  deleteRequest,
  sendRequest,
  updateRequest,
} from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import {
  GetIndicatorResponse,
  SaveNewPanelData,
  SendPanelPreviewData,
  SendPanelPreviewResponse,
  YearsInpuResponse,
} from "./configNewPanel.types";

export async function getInticator() {
  const response = await sendRequest<GetIndicatorResponse>(
    API_ROUTES_PROTECTED.INDICATOR
  );

  return response.data.panels;
}

export async function sendPanelPreview<T>(data: SendPanelPreviewData) {
  const response = await createRequest<SendPanelPreviewResponse<T>>(
    API_ROUTES_PROTECTED.PANEL_PREVIEW,
    data
  );
  return response.data;
}

export async function saveNewPanel(data: SaveNewPanelData) {
  await createRequest(API_ROUTES_PROTECTED.SAVE_NEW_PANEL, data);
}

export async function updateNewPanel(data: SaveNewPanelData, id: string) {
  const endpoint = API_ROUTES_PROTECTED.SAVE_NEW_PANEL + "/" + id;
  await updateRequest(endpoint, data);
}

export async function deleteNewPanel(id: string) {
  const endpoint = API_ROUTES_PROTECTED.SAVE_NEW_PANEL + "/" + id;
  await deleteRequest(endpoint);
}

export async function sendRequestYearsData() {
  const response = await sendRequest<YearsInpuResponse>(
    API_ROUTES_PROTECTED.YEARS_DATA
  );
  return response.data;
}
