export type SelectedCheckboxGeneric = {
  selected?: boolean;
};

export type SelectCheckboxProps<T> = {
  label: string;
  selectedText: string;
  items: T[];
  selectedIds: string[];
  onChangeSelectedIds: (selectedIds: string[]) => void;
  getId: (item: T) => string;
  getName: (item: T) => string;
  getNameLabel: (item: T) => string;
  maxItems?: number;
  maxItemsText?: string;
  showSearchBar?: boolean;
  loading?: boolean;
};
