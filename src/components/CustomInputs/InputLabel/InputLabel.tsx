import React from "react";

import { Typography } from "@cpqd-quati/react";

import "./InputLabel.styles.scss";

export const InputLabel: React.FC<{ children: string }> = (props) => {
  return (
    <Typography
      variant="body"
      size="md"
      fontWeight="medium"
      className="default-input-label"
      color="var(--neutral-700)"
    >
      {props.children}
    </Typography>
  );
};
