import React from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { FilterPanelProps } from "./FilterPanel.types";

import Badge from "@/components/Badge";
import SelectFilterCities from "@/components/CustomInputs/SelectFilterCities";
import SelectFilterStates from "@/components/CustomInputs/SelectFilterStates";
import SelectProducers from "@/components/CustomInputs/SelectProducers";
import { useFilterCityAndState } from "@/hooks/useFilterCityAndState";
import { useHasEmptyInputNewPanel } from "@/hooks/useHasEmptyInputNewPanel";
import { configNewPanelActions } from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { AppDispatch, RootState } from "@/store/store";
import { City } from "@/types/City";
import { State } from "@/types/State";

import "./FilterPanel.styles.scss";

export const FilterPanel: React.FC<FilterPanelProps> = React.memo(
  function FilterPanel(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const { hasSomeInputEmpty } = useHasEmptyInputNewPanel();
    const {
      filters: {
        cities: citiesFilter,
        states: statesFilter,
        producers: producersFilter,
      },
      criterion,
    } = useSelector((state: RootState) => state.configNewPanel);

    function changeCitiesFilter(cities: City[]) {
      dispatch(configNewPanelActions.changeCitiesFilter(cities));
    }
    function changeCitiesSelectedIds(cities: string[]) {
      dispatch(configNewPanelActions.changeCitiesSelectedIds(cities));
    }

    function changeStatesFilter(states: State[]) {
      dispatch(configNewPanelActions.changeStatesFilter(states));
    }

    function changeStatesSelectedIds(states: string[]) {
      dispatch(configNewPanelActions.changeStatesSelectedIds(states));
    }

    function cleanProducersSelected() {
      dispatch(configNewPanelActions.cleanProducersSelectedIds());
    }

    function changeProducersSelectedIds(producers: string[]) {
      dispatch(configNewPanelActions.changeProducersSelectedIds(producers));
    }

    function onCleanFilters() {
      dispatch(configNewPanelActions.cleanCitiesAndStates());
    }

    useFilterCityAndState({
      changeCitiesFilter,
      changeStatesFilter,
      selectedStatesIds: statesFilter.statesIdsSelected,
    });

    const showCleanFilters = React.useMemo(() => {
      return (
        citiesFilter.citiesIdsSelected.length > 0 ||
        statesFilter.statesIdsSelected.length > 0
      );
    }, [citiesFilter, statesFilter]);

    const showProducers = React.useMemo(() => {
      const hasSomeLocationFilter =
        citiesFilter.citiesIdsSelected.length > 0 ||
        statesFilter.statesIdsSelected.length > 0;
      return criterion === "comparison" && hasSomeLocationFilter;
    }, [citiesFilter, statesFilter, criterion]);

    React.useEffect(() => {
      if (hasSomeInputEmpty) {
        dispatch(configNewPanelActions.cleanPreview());
      }
    }, [hasSomeInputEmpty]);

    if (hasSomeInputEmpty) return <></>;

    return (
      <div className="panel-configuration-card card-container">
        <Typography variant="body" fontWeight="bold" size="lg">
          {t("Dashboard.ConfigurePanel.filtersPanelTitle")}
        </Typography>
        <div className="filters-panel-row-bar">
          <SelectFilterStates
            items={statesFilter.statesOptions}
            selectedIds={statesFilter.statesIdsSelected}
            onChangeSelectedIds={changeStatesSelectedIds}
          />
          <SelectFilterCities
            items={citiesFilter.citiesOptions}
            selectedIds={citiesFilter.citiesIdsSelected}
            onChangeSelectedIds={changeCitiesSelectedIds}
          />
          {showCleanFilters && (
            <Button
              onClick={onCleanFilters}
              variant="tertiary"
              size="sm"
              color="var(--neutral-700)"
            >
              {t("General.cleanFilters")}
            </Button>
          )}
        </div>
        {showProducers && (
          <>
            <div className="filters-panel-row-bar">
              <div style={{ flex: 1 }}>
                <Badge
                  size="large"
                  shape="square"
                  text={t("Dashboard.ConfigurePanel.maxProducers", {
                    quant: props.maxProducers,
                  })}
                />
              </div>
              <Badge
                size="large"
                shape="square"
                variant={
                  producersFilter.producersIdsSelected.length >
                  props.maxProducers
                    ? "danger"
                    : "info"
                }
                text={t(
                  producersFilter.producersIdsSelected.length > 1
                    ? "Dashboard.ConfigurePanel.selected"
                    : "Dashboard.ConfigurePanel.selectedSingle",
                  {
                    quant: producersFilter.producersIdsSelected.length,
                  }
                )}
              />
              <Button
                size="sm"
                variant="tertiary"
                onClick={() => cleanProducersSelected()}
              >
                {t("Dashboard.ConfigurePanel.cleanSelection")}
              </Button>
            </div>
            <SelectProducers
              producers={producersFilter.producersOptions}
              selectedProducersIds={producersFilter.producersIdsSelected}
              onChangeProducerSelectedIds={changeProducersSelectedIds}
              loading={false}
            />
          </>
        )}
      </div>
    );
  },
  areEqual
);

function areEqual() {
  return true;
}
