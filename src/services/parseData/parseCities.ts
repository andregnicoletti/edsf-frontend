import { CitiesResponse } from "../axios/cities/cities.types";

import { City } from "@/types/City";

export function parseCitiesResponse(data: CitiesResponse): City[] {
  const sortedCities = [...data.cities].sort((a, b) =>
    a.city.localeCompare(b.city)
  );
  return sortedCities.map((city) => {
    return {
      id: city.id,
      city: city.city,
      state_id: city.state_id,
    };
  });
}
