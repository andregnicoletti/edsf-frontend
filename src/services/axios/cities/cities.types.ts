export type CitiesRequestData = {
  cityName?: string;
  uf?: string;
};

export type CitiesResponse = {
  cities: Array<{
    id: string;
    city: string;
    state_id: string;
  }>;
};
