import React from "react";

import { Icon, Typography } from "@cpqd-quati/react";
import { Collapse } from "@mui/material";

import { SideMenuButtonProps } from "./SideMenuButton.types";

import "./SideMenuButton.styles.scss";

export const SideMenuButton: React.FC<SideMenuButtonProps> = (props) => {
  return (
    <button
      type="button"
      className={props.active ? "active" : ""}
      onClick={props.onClick}
    >
      <Icon
        size="sm"
        color="var(--primary-800)"
        iconName={props.iconName as any}
      />
      <Collapse in={props.isExpanded} orientation="horizontal">
        <Typography className="side-menu-button-text">
          {props.children}
        </Typography>
      </Collapse>
    </button>
  );
};
