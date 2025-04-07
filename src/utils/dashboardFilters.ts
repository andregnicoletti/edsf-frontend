import { City } from "@/types/City";

export function filterCitiesByState(
  selectedIdsStates: string[],
  cities: City[]
) {
  const citiesByState: City[] = cities.filter((city) =>
    selectedIdsStates.includes(city.state_id)
  );

  return citiesByState;
}

export function parseFiltersToSendRequestDetailedExtract(
  citiesFilterOptions: City[],
  citiesSelectedIds: string[]
) {
  const citiesSelected = citiesFilterOptions.filter((item) =>
    citiesSelectedIds.includes(item.id)
  );
  const citiesSelectedNames = citiesSelected.map((city) => city.city);

  return {
    citiesSelectedNames,
  };
}
