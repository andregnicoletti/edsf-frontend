import React from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

export const useHasEmptyInputNewPanel = () => {
  const {
    filters: {
      indicator: { indicatorIdSelected },
    },
    panelType,
    dataSelectionComparison,
    dataSelectionPerformance,
    attributes,
    criterion,
  } = useSelector((state: RootState) => state.configNewPanel);

  const hasSomeInputEmpty = React.useMemo(() => {
    const IndicatorORCriterionEmpty = !indicatorIdSelected || !criterion;
    const someComparisonInputEmpty =
      IndicatorORCriterionEmpty || dataSelectionComparison.length === 0;
    const somePerformanceInputEmpty =
      IndicatorORCriterionEmpty || dataSelectionPerformance.length === 0;

    const hasSomeInputEmpty =
      criterion === "comparison"
        ? someComparisonInputEmpty
        : somePerformanceInputEmpty;

    if (panelType === "table") {
      const attributesEmpty = attributes.length === 0;
      return hasSomeInputEmpty || attributesEmpty;
    }

    return hasSomeInputEmpty;
  }, [
    panelType,
    criterion,
    dataSelectionComparison,
    dataSelectionPerformance,
    attributes,
    indicatorIdSelected,
  ]);

  return { hasSomeInputEmpty };
};
