import { Typography } from "@cpqd-quati/react";
import { Checkbox, MenuItem } from "@mui/material";

import { SelectCheckboxItemProps } from "./SelectCheckboxItem.types";

export function SelectCheckboxItem(props: SelectCheckboxItemProps) {
  return (
    <MenuItem
      value={props.id}
      style={{ padding: 0, height: "var(--spacing-18)" }}
      onClick={(e) => props.onClickCheckbox(e)}
    >
      <Checkbox color="primary" size="small" checked={props.selected} />
      <Typography
        style={{ lineHeight: 0 }}
        variant="body"
        fontWeight="regular"
        size="md"
      >
        {props.nameLabel}
      </Typography>
    </MenuItem>
  );
}
