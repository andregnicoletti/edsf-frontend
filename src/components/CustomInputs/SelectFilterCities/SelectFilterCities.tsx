import React from "react";

import { useTranslation } from "react-i18next";

import SelectCheckbox from "../SelectCheckbox";

import { SelectFilterCitiesProps } from "./SelectFilterCities.types";

import { City } from "@/types/City";
import { makeInputValueForMultipleItems } from "@/utils/inputs";

export const SelectFilterCities: React.FC<SelectFilterCitiesProps> = (
  props
) => {
  const { t } = useTranslation();

  const cityInputValue = React.useMemo(
    () =>
      makeInputValueForMultipleItems(
        props.items,
        props.selectedIds,
        t("Dashboard.detailedExtract.multipleCitiessSelected"),
        (item: City) => item.city,
        (item: City) => item.id
      ),
    [props.selectedIds, props.items]
  );

  return (
    <div className="input-width-field-130">
      <SelectCheckbox
        items={props.items}
        selectedIds={props.selectedIds}
        selectedText={cityInputValue}
        onChangeSelectedIds={(items) => props.onChangeSelectedIds(items)}
        getId={(item) => (item as City).id}
        getName={(item) => (item as City).city}
        getNameLabel={(item) =>
          `${(item as City).city}/${(item as City).state_id}`
        }
        label={t("Dashboard.detailedExtract.filterMunicipalityLabel")}
        maxItems={10}
        maxItemsText={t("Dashboard.detailedExtract.maxCitiesSelectedBadge")}
        showSearchBar
        loading={props.loading}
      />
    </div>
  );
};
