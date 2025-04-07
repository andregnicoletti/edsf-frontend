import { makeStyles } from "@mui/styles";

export const useInputBackgroundStyle = makeStyles(() => ({
  root: {
    background: "rgba(241, 249, 231, 1)",
  },
}));

export const sxSelectPlaceholder: any = {
  "& .MuiSelect-select span::before": {
    content: "'Selecione'",
    color: "var(--neutral-500)",
  },
};

export const sxInputNeutral: any = {
  "& .MuiInputBase-input": {
    color: "var(--neutral-700) !important",
    fontWeight: "var(--font-weight-regular) !important",
  },
};
