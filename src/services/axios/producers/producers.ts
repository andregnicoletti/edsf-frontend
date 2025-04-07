import { createRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import {
  RequestProducerByCitiesIdsData,
  RequestProducerByCitiesIdsResponse,
} from "./producers.types";

import { Producer } from "@/types/Producer";

export async function requestProducersByCitiesIds(
  data: RequestProducerByCitiesIdsData
): Promise<Producer[]> {
  const response = await createRequest<RequestProducerByCitiesIdsResponse>(
    API_ROUTES_PROTECTED.PRODUCER_BY_CITIES_ID,
    { ids: data }
  );

  return response.producers;
}
