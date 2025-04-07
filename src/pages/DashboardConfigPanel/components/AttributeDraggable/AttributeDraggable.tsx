import React from "react";

import { IconButton, Typography } from "@cpqd-quati/react";

import "./AttributeDraggable.styles.scss";

export const AttributeDraggable: React.FC = () => {
  return (
    <div className="attribute-container">
      <img className="attribute-drag-icon" src="/dragIndicator.svg" alt="" />
      <Typography
        variant="body"
        fontWeight="medium"
        size="md"
        color="var(--neutral-700)"
        flex={1}
      >
        Nome do indicador
      </Typography>
      <IconButton
        variant="tertiary"
        iconName="ArrowDown"
        size="xs"
        aria-label="order"
      />
      <IconButton
        variant="tertiary"
        iconName="Close"
        size="xs"
        aria-label="order"
      />
    </div>
  );
};
