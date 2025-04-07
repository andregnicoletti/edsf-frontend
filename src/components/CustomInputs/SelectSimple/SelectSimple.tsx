import React from "react";

import { Typography } from "@cpqd-quati/react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

import InputLabelCustom from "../InputLabel";

import {
  RenderMultipleValuesProps,
  SelectSimpleProps,
} from "./SelectSimple.types";

import Badge from "@/components/Badge";
import useOpenSelect from "@/hooks/useOpenSelect";
import {
  sxInputNeutral,
  sxSelectPlaceholder,
  useInputBackgroundStyle,
} from "@/styles/inputStyle";

import "./SelectSimple.styles.scss";

function SelectSimple<T>(props: SelectSimpleProps<T>) {
  const { t } = useTranslation();
  const {
    defaultOptionText = t("General.allSelect"),
    showDefaultOption = true,
    maxMultipleItems = Infinity,
  } = props;
  const styles = useInputBackgroundStyle();

  const [isFocused, setIsFocused] = React.useState(false);
  const floatingDivRef = React.useRef<HTMLDivElement>(null);
  const { handleClick, open, setOpen, blurSelect } = useOpenSelect({
    floatingDivRef,
  });

  function onCancel() {
    setOpen(false);
    blurSelect();
  }

  function onChangeValue(value: string) {
    if (!props.multiple) {
      props.onChangeSelectedOptionId(value);
      onCancel();
    } else {
      onChangeMultipleValue(value);
    }
  }

  function onChangeMultipleValue(value: string) {
    const options = (props.selectedOptionId as string[]) || [];
    const newValueAlreadyInList = options.includes(value);
    if (newValueAlreadyInList) {
      const listRemovingValue = options.filter((id) => id !== value);
      props.onChangeSelectedOptionId(listRemovingValue);
    } else if (options.length < maxMultipleItems) {
      props.onChangeSelectedOptionId([...options, value]);
    }
  }

  function renderValue() {
    const isMultipleEmpty =
      Array.isArray(props.selectedOptionId) &&
      props.selectedOptionId.length === 0;

    if (!props.multiple) {
      return getNameFromId(props.selectedOptionId as string);
    }
    if (isMultipleEmpty) {
      return "";
    }
    return (
      <RenderMultipleValues
        getNameFromId={getNameFromId}
        ids={props.selectedOptionId as any}
      />
    );
  }

  function getNameFromId(id: string) {
    const option = props.options.find((option) => props.getId(option) === id);
    const name = option ? props.getName(option) : "";
    return name;
  }

  function checkItemIsSelected(item: T) {
    if (props.multiple && Array.isArray(props.selectedOptionId)) {
      return props.selectedOptionId.includes(props.getId(item));
    }
    return props.getId(item) === props.selectedOptionId;
  }

  const isHiddenLabel = React.useMemo(() => {
    return !!props.selectedOptionId || open || isFocused;
  }, [props.selectedOptionId, open, isFocused]);

  const selectedClass = React.useMemo(() => {
    return props.selectedOptionId && props.variant === "primary"
      ? styles.root
      : undefined;
  }, [props.selectedOptionId, props.variant]);

  return (
    <FormControl fullWidth size="small">
      {props.isOutsideLabel ? (
        <InputLabelCustom>{props.label}</InputLabelCustom>
      ) : (
        <InputLabel shrink={isHiddenLabel}>{props.label}</InputLabel>
      )}
      <Select
        open={open}
        variant="outlined"
        multiple
        className={selectedClass}
        value={[] as any}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClose={onCancel}
        onMouseDown={handleClick}
        label={props.isOutsideLabel ? undefined : props.label}
        renderValue={renderValue}
        sx={[
          props.isOutsideLabel ? { ...sxSelectPlaceholder } : undefined,
          props.variant !== "primary" ? { ...sxInputNeutral } : undefined,
        ]}
        displayEmpty={isHiddenLabel}
      >
        <div ref={floatingDivRef} className="select-simple-float-container">
          {!props.multiple && showDefaultOption && (
            <MenuItem
              style={{ color: "var(--neutral-500)" }}
              selected={!props.selectedOptionId}
              onClick={() => onChangeValue("")}
              value=""
            >
              <Typography variant="body" size="md" fontWeight="regular">
                {defaultOptionText}
              </Typography>
            </MenuItem>
          )}
          {props.options.map((fileTypeOption) => (
            <MenuItem
              selected={checkItemIsSelected(fileTypeOption)}
              key={props.getId(fileTypeOption)}
              onClick={() => onChangeValue(props.getId(fileTypeOption))}
              value={props.getId(fileTypeOption)}
            >
              <Typography variant="body" size="md" fontWeight="regular">
                {props.getName(fileTypeOption)}
              </Typography>
            </MenuItem>
          ))}
        </div>
      </Select>
    </FormControl>
  );
}

function RenderMultipleValues(props: RenderMultipleValuesProps) {
  return (
    <div className="select-multiple-values-container">
      {props.ids.map((id) => (
        <Badge
          key={id}
          size="small"
          shape="square"
          text={props.getNameFromId(id)}
        />
      ))}
    </div>
  );
}

export { SelectSimple };
