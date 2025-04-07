import React from "react";

import dayjs from "dayjs";

import { CopyFiltersProps } from "./useCopyFilters.types";

const CopyFiltersContext = React.createContext<CopyFiltersProps>(
  {} as CopyFiltersProps
);

export const CopyFiltersContextProvider: React.FC<{
  children: React.ReactElement;
}> = (props) => {
  const [citiesSelectedIds, setCitiesSelectedIds] = React.useState<string[]>(
    []
  );
  const [statesSelectedIds, setStatesSelectedIds] = React.useState<string[]>(
    []
  );
  const [coursesSelectedCodes, setCoursesSelectedCodes] = React.useState<
    string[]
  >([]);
  const [dateFrom, setDateFrom] = React.useState<string>(dayjs().toString());
  const [dateTo, setDateTo] = React.useState<string>(dayjs().toString());

  function copyFilters(
    cityIds: string[],
    stateIds: string[],
    courseIds: string[],
    dateFrom: string,
    dateTo: string
  ) {
    setCitiesSelectedIds(cityIds);
    setStatesSelectedIds(stateIds);
    setCoursesSelectedCodes(courseIds);
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  }

  const value = React.useMemo(
    () => ({
      copiedFilters: {
        citiesSelectedIds,
        statesSelectedIds,
        coursesSelectedCodes,
        dateFrom,
        dateTo,
      },
      copyFilters,
    }),
    [
      citiesSelectedIds,
      statesSelectedIds,
      coursesSelectedCodes,
      copyFilters,
      dateFrom,
      dateTo,
    ]
  );

  return (
    <CopyFiltersContext.Provider value={value}>
      {props.children}
    </CopyFiltersContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCopyFiltersContext = () => React.useContext(CopyFiltersContext);
