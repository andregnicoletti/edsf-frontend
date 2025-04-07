import { sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import {
  RequestIndicatorItem,
  RequestIndicatorsResponse,
} from "./indicators.types";

export async function requestIndicators(): Promise<RequestIndicatorItem[]> {
  const response = await sendRequest<RequestIndicatorsResponse>(
    API_ROUTES_PROTECTED.INDICATORS
  );

  return response.data.panels;
}
