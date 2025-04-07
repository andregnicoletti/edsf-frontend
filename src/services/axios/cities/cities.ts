import { sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import { CitiesResponse } from "./cities.types";

import { parseCitiesResponse } from "@/services/parseData/parseCities";
import { City } from "@/types/City";

export async function requestCities(): Promise<City[]> {
  const response = await sendRequest<CitiesResponse>(API_ROUTES_PROTECTED.CITY);

  const cities = parseCitiesResponse(response.data);
  return cities;
}
