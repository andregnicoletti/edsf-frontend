export type CustomSelectProps = {
  label: string;
  options: CustomSelectOption[];
  selectedOption: CustomSelectOption;
  onChangeOption: (option: CustomSelectOption) => void;
};

export type CustomSelectOption = {
  label: string;
  value?: string;
  default?: boolean;
};
