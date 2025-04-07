import { createRequest, sendRequest } from "../axios";
import { API_ROUTES } from "../endpoints";

import {
  CreateLeadData,
  CreateLeadResponse,
  GetLeadsResponse,
  LeadsArray,
} from "./leads.types";

export async function createLead(
  data: CreateLeadData
): Promise<CreateLeadResponse> {
  const response = await createRequest<CreateLeadResponse>(API_ROUTES.LEADS, {
    data,
  });
  return response;
}

export async function getLeads(): Promise<LeadsArray> {
  const response = await sendRequest<GetLeadsResponse>(API_ROUTES.LEADS);
  return response.data.channels as LeadsArray;
}
