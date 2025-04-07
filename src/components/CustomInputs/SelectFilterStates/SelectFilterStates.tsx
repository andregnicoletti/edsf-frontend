import React from "react";

import { useTranslation } from "react-i18next";

import SelectCheckbox from "../SelectCheckbox";

import { SelectFilterStatesProps } from "./SelectFilterStates.types";

import { State } from "@/types/State";
import { makeInputValueForMultipleItems } from "@/utils/inputs";

export const SelectFilterStates: React.FC<SelectFilterStatesProps> = (
  props
) => {
  const { t } = useTranslation();

  const stateInputValue = React.useMemo(
    () =>
      makeInputValueForMultipleItems(
        props.items,
        props.selectedIds,
        t("Dashboard.detailedExtract.multipleUFsSelected"),
        (item: State) => item.state_id,
        (item: State) => item.state_id
      ),
    [props.selectedIds, props.items]
  );

  return (
    <div className="input-width-field-110">
      <SelectCheckbox
        items={props.items}
        onChangeSelectedIds={props.onChangeSelectedIds}
        selectedIds={props.selectedIds}
        getId={(item) => (item as State).state_id}
        getName={(item) => (item as State).state_id}
        getNameLabel={(item) => (item as State).state_id}
        selectedText={stateInputValue}
        label={t("Dashboard.detailedExtract.filterUFLabel")}
        showSearchBar
        loading={props.loading}
      />
    </div>
  );
};
