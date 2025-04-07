import React from "react";

import { Typography } from "@cpqd-quati/react";

import { UploadPanelProps } from "./UploadPanel.types";

import Badge from "@/components/Badge";
import PanelBase from "@/components/PanelBase";

import "./UploadPanel.styles.scss";

export const UploadPanel: React.FC<UploadPanelProps> = (props) => {
  return (
    <PanelBase>
      <div className="flex panel-title-row">
        <Badge variant="support" text={props.badgeText}></Badge>
        <Typography
          className="panel-title"
          variant="body"
          fontWeight="regular"
          size="md"
        >
          {props.title}
        </Typography>
      </div>
      <div className="flex panel-content">{props.children}</div>
    </PanelBase>
  );
};
