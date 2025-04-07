import { BadgeShape, BadgeSize, BadgeType, BadgeVariant } from "./Badge.types";

export const classSize: Record<BadgeSize, string> = {
  small: "badge-container badge-container-small",
  medium: "badge-container badge-container-medium",
  large: "badge-container badge-container-large",
};

export const colorsVar: Record<
  BadgeType,
  Record<BadgeVariant, Record<string, string>>
> = {
  filled: {
    neutral: {
      color: "var(--neutral-700)",
      fill: "var(--neutral-800)",
    },
    primary: {
      color: "var(--primary-900)",
      fill: "var(--primary-900)",
    },
    support: {
      color: "var(--support-800)",
      fill: "var(--support-800)",
    },
    info: {
      color: "var(--indicator-info-400)",
      fill: "var(--indicator-info-400)",
    },
    danger: {
      color: "var(--indicator-danger-400)",
      fill: "var(--indicator-danger-400)",
    },
  },
  outline: {
    neutral: {
      color: "var(--neutral-700)",
      fill: "var(--neutral-800)",
    },
    primary: {},
    support: {},
    info: {},
    danger: {},
  },
};

export const colorsClassContainer: Record<
  BadgeType,
  Record<BadgeVariant, string>
> = {
  filled: {
    neutral: "background-neutral",
    primary: "background-primary",
    support: "background-support",
    info: "background-indicator-info",
    danger: "background-indicator-danger",
  },
  outline: {
    neutral: "background-transparent badge-border badge-border-neutral",
    primary: "",
    support: "",
    info: "",
    danger: "",
  },
};

export const shapeClass: Record<BadgeShape, string> = {
  square: "badge-square",
  rounded: "badge-rounded",
};
