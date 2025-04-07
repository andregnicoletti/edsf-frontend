import React from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { City } from "@/types/City";
import { State } from "@/types/State";
import { filterCitiesByState } from "@/utils/dashboardFilters";

type UseFilterCityAndStateParams = {
  selectedStatesIds: string[];
  changeCitiesFilter: (cities: City[]) => void;
  changeStatesFilter: (states: State[]) => void;
};

export const useFilterCityAndState = (props: UseFilterCityAndStateParams) => {
  const { cities, states } = useSelector((state: RootState) => state.cities);

  function resetCitiesOptions() {
    props.changeCitiesFilter(cities);
  }

  function handleCitiesFilterWhenStatesChanges() {
    const hasStatesSelected = props.selectedStatesIds.length > 0;
    if (!hasStatesSelected) {
      resetCitiesOptions();
    } else {
      const citiesByState = filterCitiesByState(
        props.selectedStatesIds,
        cities
      );
      props.changeCitiesFilter(citiesByState);
    }
  }

  React.useEffect(() => {
    props.changeStatesFilter(states);
  }, [states]);

  React.useEffect(() => {
    props.changeCitiesFilter(cities);
  }, [cities]);

  React.useEffect(() => {
    handleCitiesFilterWhenStatesChanges();
  }, [props.selectedStatesIds]);

  return {};
};
