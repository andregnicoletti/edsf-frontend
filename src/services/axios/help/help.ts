import { sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import { GetHelpInfoResponse } from "./help.types";

export async function getHelpInfo() {
  const response = await sendRequest<GetHelpInfoResponse>(
    API_ROUTES_PROTECTED.HELP_INFO
  );
  return response.data.propertiesJson;
}
