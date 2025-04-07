import { CardInfoVariants } from "./CardInfo.types";

export const cardInfoColors: Record<
  CardInfoVariants,
  {
    backgroundColor: string;
    color: string;
  }
> = {
  danger: {
    backgroundColor: "var(--indicator-danger-100)",
    color: "var(--indicator-danger-400)",
  },
  support: {
    backgroundColor: "var(--support-100)",
    color: "var(--support-900)",
  },
  primary: {
    backgroundColor: "var(--primary-100)",
    color: "var(--primary-900)",
  },
};
