import React from "react";

import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { SelectCheckboxSearchBarProps } from "./SelectCheckboxSearchBar.types";

import InputRightIcon from "@/components/CustomInputs/InputRightIcon";

export const SelectCheckboxSearchBar: React.FC<SelectCheckboxSearchBarProps> = (
  props
) => {
  const { t } = useTranslation();

  if (!props.show) return null;

  return (
    <TextField
      value={props.value}
      autoFocus
      type="search"
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={t("SelectCheckbox.searchPlaceholder")}
      slotProps={{
        input: {
          endAdornment: <InputRightIcon iconName="Search" />,
        },
      }}
    />
  );
};
