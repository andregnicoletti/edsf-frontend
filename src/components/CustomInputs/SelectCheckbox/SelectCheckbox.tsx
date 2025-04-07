import React from "react";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import Badge from "../../Badge";

import ButtonsBar from "./components/ButtonsBar";
import SelectCheckboxList from "./components/SelectCheckboxList";
import SelectCheckboxSearchBar from "./components/SelectCheckboxSearchBar";
import SelectedsList from "./components/SelectedsList";
import { SelectCheckboxProps } from "./SelectCheckbox.types";

import useOpenSelect from "@/hooks/useOpenSelect";
import { useInputBackgroundStyle } from "@/styles/inputStyle";
import { searchFilterItemList, selectItemFromList } from "@/utils/filters";

import "./SelectCheckbox.styles.scss";

const SelectCheckbox = React.memo(function SelectCheckbox<T>(
  props: SelectCheckboxProps<T>
) {
  const { t } = useTranslation();
  const classes = useInputBackgroundStyle();
  const [tempSelectedIds, setTempSelectedIds] = React.useState(
    props.selectedIds
  );
  const [isFocused, setIsFocused] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const floatingDivRef = React.useRef<HTMLDivElement>(null);
  const { handleClick, open, setOpen, blurSelect } = useOpenSelect({
    floatingDivRef,
  });

  function onApply() {
    props.onChangeSelectedIds(tempSelectedIds);
    setOpen(false);
    blurSelect();
  }

  function onCancel() {
    setOpen(false);
    blurSelect();
    resetItemsAfterClose();
  }

  function resetItemsAfterClose() {
    setTimeout(() => {
      setTempSelectedIds(props.selectedIds);
    }, 500);
  }

  function onClickCheckbox(
    e: React.MouseEvent<HTMLLIElement>,
    itemToSelect: T
  ) {
    e.stopPropagation();
    e.preventDefault();

    const isSelected = tempSelectedIds.includes(props.getId(itemToSelect));
    const canChangeCheckboxState =
      isSelected || !props.maxItems || tempSelectedIds.length < props.maxItems;
    if (canChangeCheckboxState) {
      const newItemsSelected = selectItemFromList(
        tempSelectedIds,
        itemToSelect,
        props.getId
      );
      setTempSelectedIds(newItemsSelected);
    }
  }

  const badgeSelectedText = React.useMemo(() => {
    const sizeSelected = tempSelectedIds.length;
    if (sizeSelected > 1)
      return `${sizeSelected} ${t("SelectCheckbox.multipleSelectedBadge")}`;
    else if (sizeSelected === 1)
      return `${sizeSelected} ${t("SelectCheckbox.singleSelectedBadge")}`;
    return t("SelectCheckbox.noItemsSelectedBadge");
  }, [tempSelectedIds]);

  const isHiddenLabel = React.useMemo(() => {
    return !!props.selectedText || open || isFocused;
  }, [props.selectedText, open, isFocused]);

  const searchedTempItems = React.useMemo(() => {
    return searchFilterItemList(search, props.items, props.getName);
  }, [props.items, search]);

  React.useEffect(() => {
    setTempSelectedIds(props.selectedIds);
  }, [props.selectedIds]);

  return (
    <FormControl fullWidth size="small">
      <InputLabel shrink={isHiddenLabel}>{props.label}</InputLabel>
      <Select
        open={open}
        multiple
        className={props.selectedText ? classes.root : ""}
        value={[]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClose={onCancel}
        onMouseDown={handleClick}
        label={props.label}
        renderValue={() => props.selectedText}
        displayEmpty={isHiddenLabel}
      >
        <div ref={floatingDivRef} className="select-checkbox-float-container">
          <SelectCheckboxSearchBar
            value={search}
            onChange={setSearch}
            show={props.showSearchBar}
          />
          {props.maxItems && (
            <Badge
              text={props.maxItemsText}
              toCenter
              size="large"
              shape="square"
              width="100%"
              variant="neutral"
            />
          )}
          <div className="select-checkbox-items-list">
            {props.loading ? (
              <div className="loading-container">
                <CircularProgress size={"1.5rem"} />
              </div>
            ) : (
              <SelectCheckboxList
                list={searchedTempItems.filter(
                  (item) => !tempSelectedIds.includes(props.getId(item))
                )}
                selectedIds={tempSelectedIds}
                getId={props.getId}
                getNameLabel={props.getNameLabel}
                onClickCheckbox={onClickCheckbox}
              />
            )}
          </div>
          <SelectedsList
            items={props.items.filter((item) =>
              tempSelectedIds.includes(props.getId(item))
            )}
            selectedIds={tempSelectedIds}
            text={badgeSelectedText}
            getId={props.getId}
            getNameLabel={props.getNameLabel}
            onClickCheckbox={onClickCheckbox}
          />
          <ButtonsBar onApply={onApply} onCancel={onCancel} />
        </div>
      </Select>
    </FormControl>
  );
},
areEqualSelectCheckbox);

function areEqualSelectCheckbox<T>(
  prevProps: SelectCheckboxProps<T>,
  nextProps: SelectCheckboxProps<T>
) {
  if (prevProps.items.length !== nextProps.items.length) return false;

  const loadingAreEqual = prevProps.loading === nextProps.loading;
  const selectedTextAreEqual =
    prevProps.selectedText === nextProps.selectedText;

  const isDifferentItems =
    prevProps.items.toString() !== nextProps.items.toString();
  const isDifferentSelecteds =
    prevProps.selectedIds.toString() !== nextProps.selectedIds.toString();
  return (
    !isDifferentItems &&
    !isDifferentSelecteds &&
    selectedTextAreEqual &&
    loadingAreEqual
  );
}

export { SelectCheckbox };
