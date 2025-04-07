import React, { useMemo } from "react";

import { CircularProgress, Stack } from "@mui/material";

import { ButtonProps } from "./Button.types";

import "./Button.styles.css";

export const Button: React.FC<ButtonProps> = (props) => {
  const buttonClass = useMemo(() => {
    let classe = "custom-buttom";
    if (props.fill) classe += " fill";
    if (props.shape === "square") classe += " button-square";
    if (props.variant === "secondary") classe += " button-secondary";
    return classe;
  }, [props.fill, props.shape, props.variant]);

  return (
    <button
      type={props.type}
      className={buttonClass}
      onClick={!props.loading ? props.onClick : undefined}
    >
      {!props.loading ? (
        props.children
      ) : (
        <Stack sx={{ color: "black", display: "flex", alignItems: "center" }}>
          <CircularProgress size="1rem" color="inherit" />
        </Stack>
      )}
    </button>
  );
};
