import React from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { Dialog } from "@mui/material";

import { DialogueProps } from "./Dialogue.types";

import "./Dialogue.styles.scss";

export const Dialogue: React.FC<DialogueProps> = (props) => {
  return (
    <Dialog open={props.open}>
      <div className="dialogue-container">
        <Typography variant="title6">{props.title}</Typography>
        {props.component}
        <Typography variant="body" fontWeight="regular" size="lg">
          {props.text}
        </Typography>
        <div className="dialogue-buttons-container">
          <Button variant="secondary" onClick={props.onPressCancel}>
            {props.cancelButtonText}
          </Button>
          <Button variant="primary" onClick={props.onPressConfirm}>
            {props.confirmButtonText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
