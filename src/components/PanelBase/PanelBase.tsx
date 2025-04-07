import React, { useState } from "react";

import { IconButton, Typography } from "@cpqd-quati/react";
import { Collapse } from "@mui/material";

import { PanelBaseProps } from "./PanelBase.types";

import "./PanelBase.styles.scss";

export const PanelBase: React.FC<PanelBaseProps> = (props) => {
  const [open, setOpen] = useState(!props.defaultIsCollapsed);

  function onClickOpenArrow() {
    setOpen((last) => !last);
  }

  return (
    <div className="flex-column panel-container">
      <div className="flex panel-header">
        <div className="flex panel-header-left-container">
          {props.leftIcon}
          {props.headerTitle && (
            <Typography variant="body" fontWeight="bold" size="lg">
              {props.headerTitle}
            </Typography>
          )}
        </div>
        <div className="flex panel-header-right-container">
          {props.rightComponent}
          {props.isCollapsable && (
            <IconButton
              size="md"
              aria-label="collapsable-panel-button"
              variant="tertiary"
              iconName={open ? "ChevronUp" : "ChevronDown"}
              onClick={onClickOpenArrow}
            />
          )}
        </div>
      </div>
      {props.isCollapsable ? (
        <Collapse style={{ flexDirection: "column" }} in={open}>
          <div className="flex-column panel-content">{props.children}</div>
        </Collapse>
      ) : (
        <div className="flex-column panel-content">{props.children}</div>
      )}
    </div>
  );
};
