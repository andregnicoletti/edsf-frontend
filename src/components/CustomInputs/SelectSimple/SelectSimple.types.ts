export type SelectSimpleProps<T> = {
  label: string;
  isOutsideLabel?: boolean;
  options: T[];
  selectedOptionId?: string | string[];
  onChangeSelectedOptionId: (option: unknown) => void;
  getId: (item: T) => string;
  getName: (item: T) => string;
  variant?: VariantSelectSimple;
  multiple?: boolean;
  maxMultipleItems?: number;
  defaultOptionText?: string;
  showDefaultOption?: boolean;
};

export type VariantSelectSimple = "primary" | "neutral";

export type RenderMultipleValuesProps = {
  ids: string[];
  getNameFromId: (id: string) => string;
};
