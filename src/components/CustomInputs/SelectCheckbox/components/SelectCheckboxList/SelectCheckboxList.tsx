import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { ViewportList } from "react-viewport-list";

import SelectCheckboxItem from "../SelectCheckboxItem";

import { SelectCheckboxListProps } from "./SelectCheckboxList.types";

import "./SelectCheckboxList.styles.scss";

function SelectCheckboxList<T>(props: SelectCheckboxListProps<T>) {
  const { showEmptyMessage = true } = props;

  const { t } = useTranslation();
  if (props.list.length === 0 && showEmptyMessage) {
    return (
      <div className="empty-checkbox-select-list">
        <Typography
          variant="body"
          fontWeight="medium"
          color="var(--neutral-700)"
        >
          {t("SelectCheckbox.noItemsSelectedMessage")}
        </Typography>
      </div>
    );
  }
  return (
    <ViewportList items={props.list}>
      {(item) => {
        return (
          <SelectCheckboxItem
            key={props.getId(item)}
            id={props.getId(item)}
            nameLabel={props.getNameLabel(item)}
            selected={props.selectedIds.some((id) => id === props.getId(item))}
            onClickCheckbox={(e) => props.onClickCheckbox(e, item)}
          />
        );
      }}
    </ViewportList>
  );
}

export { SelectCheckboxList };
