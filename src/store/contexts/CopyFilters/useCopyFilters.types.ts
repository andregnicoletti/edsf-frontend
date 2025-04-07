export type CopyFiltersProps = {
  copiedFilters: {
    coursesSelectedCodes: string[];
    citiesSelectedIds: string[];
    statesSelectedIds: string[];
    dateFrom: string;
    dateTo: string;
  };
  copyFilters: (
    cityIds: string[],
    stateIds: string[],
    courseIds: string[],
    dateFrom: string,
    dateTo: string
  ) => void;
};
