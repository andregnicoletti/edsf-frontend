import React from "react";

import { useTranslation } from "react-i18next";

import SelectCheckbox from "../SelectCheckbox";

import { SelectFilterIndicatorsProps } from "./SelectFilterIndicators.types";

import { Indicator } from "@/types/ConfigNewPanel";
import { makeInputValueForMultipleItems } from "@/utils/inputs";

export const SelectFilterIndicators: React.FC<SelectFilterIndicatorsProps> = (
  props
) => {
  const { t } = useTranslation();

  const indicatorInputValue = React.useMemo(
    () =>
      makeInputValueForMultipleItems(
        props.items,
        props.selectedIds,
        t("Dashboard.detailedExtract.multipleIndicatorsSelected"),
        (item: Indicator) => item.indicatorDescription,
        (item: Indicator) => item.code
      ),

    [props.items, props.selectedIds]
  );

  return (
    <div className="input-width-field-130">
      <SelectCheckbox
        items={props.items}
        onChangeSelectedIds={props.onChangeSelectedIds}
        selectedIds={props.selectedIds}
        getId={(item) => (item as Indicator).code}
        getName={(item) => (item as Indicator).indicatorDescription}
        getNameLabel={(item) => (item as Indicator).indicatorDescription}
        selectedText={indicatorInputValue}
        label={t("Dashboard.detailedExtract.filterIndicatorLabel")}
        loading={props.loading}
      />
    </div>
  );
};
