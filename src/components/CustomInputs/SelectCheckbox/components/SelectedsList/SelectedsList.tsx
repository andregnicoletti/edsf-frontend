import SelectCheckboxList from "../SelectCheckboxList";

import { SelectedsListProps } from "./SelectedsList.types";

import Badge from "@/components/Badge";

import "./SelectedList.styles.scss";

export function SelectedsList<T>(props: SelectedsListProps<T>) {
  return (
    <div className="select-checkbox-selecteds-list">
      <Badge
        text={props.text}
        size="large"
        variant="primary"
        width="100%"
        shape="square"
        toCenter={true}
      />
      <SelectCheckboxList
        list={props.items}
        selectedIds={props.selectedIds}
        getId={props.getId}
        getNameLabel={props.getNameLabel}
        onClickCheckbox={props.onClickCheckbox}
        showEmptyMessage={false}
      />
    </div>
  );
}
