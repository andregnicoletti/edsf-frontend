import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { SendPanelPreviewData } from "@/services/axios/configNewPanel/configNewPanel.types";
import { parseAttributesToSendPanelData } from "@/services/parseData/parseNewPanel";
import { fetchNewPanelPreview } from "@/store/features/ConfigNewPanel/configNewPanelThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Criterion } from "@/types/ConfigNewPanel";

type UseRequestNewPanelPreviewResponse = {
  configPanelDataToRequest: SendPanelPreviewData | undefined;
};

export const useRequestNewPanelPreview =
  (): UseRequestNewPanelPreviewResponse => {
    const dispatch = useDispatch<AppDispatch>();

    const {
      panelType,
      criterion,
      dataSelectionComparison,
      dataSelectionPerformance,
      panelName,
      showGoal,
      attributes,
      filters: {
        cities: { citiesIdsSelected },
        indicator: { indicatorIdSelected },
        producers: { producersIdsSelected },
        states: { statesIdsSelected },
      },
    } = useSelector((state: RootState) => state.configNewPanel);
    const { cities } = useSelector((state: RootState) => state.cities);

    const configPanelDataToRequest: SendPanelPreviewData | undefined =
      React.useMemo(() => {
        if (isDataValid()) {
          const response: SendPanelPreviewData = {
            panelType: panelType ?? "bar_chart",
            panelName,
            configuration: {
              indicator: indicatorIdSelected,
              criterion: criterion as Criterion,
              dataSelection:
                criterion === "comparison"
                  ? dataSelectionComparison
                  : [dataSelectionPerformance],
              goal: showGoal,
              filters: {
                cities: cities
                  .filter((city) => citiesIdsSelected.includes(city.id))
                  .map((city) => city.city),
                states: statesIdsSelected,
                producers: producersIdsSelected,
              },
              attributes: parseAttributesToSendPanelData(attributes),
            },
          };

          return response;
        }

        return undefined;
      }, [
        panelType,
        panelName,
        criterion,
        dataSelectionComparison,
        dataSelectionPerformance,
        showGoal,
        attributes,
        cities,
        citiesIdsSelected,
        statesIdsSelected,
        producersIdsSelected,
        indicatorIdSelected,
      ]);

    function isDataValid() {
      const performanceAllFilled =
        criterion === "performance" &&
        indicatorIdSelected &&
        dataSelectionPerformance;
      const comparisonAllFilled =
        criterion === "comparison" &&
        indicatorIdSelected &&
        dataSelectionComparison.length > 0;

      const isTableAttributesType =
        panelType === "table" && attributes.length > 0;
      const isChartType = panelType === "bar_chart";
      const isChartValid =
        isChartType && (performanceAllFilled || comparisonAllFilled);
      const isTableValid =
        isTableAttributesType && (performanceAllFilled || comparisonAllFilled);

      return isChartValid || isTableValid;
    }

    function fetchPreview() {
      if (configPanelDataToRequest) {
        dispatch(fetchNewPanelPreview(configPanelDataToRequest));
      }
    }

    React.useEffect(() => {
      fetchPreview();
    }, [
      panelType,
      panelName,
      criterion,
      dataSelectionComparison,
      dataSelectionPerformance,
      showGoal,
      attributes,
      cities,
      citiesIdsSelected,
      statesIdsSelected,
      producersIdsSelected,
      indicatorIdSelected,
    ]);

    return { configPanelDataToRequest };
  };
