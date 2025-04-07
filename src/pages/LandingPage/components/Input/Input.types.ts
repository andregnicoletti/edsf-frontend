import { Replacement } from "@react-input/mask";

export type InputProps = {
  for: string;
  label: string;
  placeholder: string;
  type?: "input" | "textarea";
  mask?: string;
  replacement?: Replacement;
  maxLength?: number;
  error?: string;
};
