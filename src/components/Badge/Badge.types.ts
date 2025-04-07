import React from "react";

export type BadgeProps = {
  size?: BadgeSize;
  text?: React.ReactNode;
  content?: React.ReactNode;
  leftIcon?: string;
  onClickLeftIcon?: () => void;
  rightIcon?: string;
  onClickRightIcon?: () => void;
  variant?: BadgeVariant;
  type?: BadgeType;
  width?: string;
  shape?: BadgeShape;
  toCenter?: boolean;
};

export type BadgeShape = "rounded" | "square";

export type BadgeType = "filled" | "outline";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "support"
  | "info"
  | "danger";

export type BadgeSize = "small" | "medium" | "large";

export type BadgeIconButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};
