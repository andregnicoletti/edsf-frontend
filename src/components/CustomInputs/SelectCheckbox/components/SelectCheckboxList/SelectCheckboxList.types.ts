export type SelectCheckboxListProps<T> = {
  list: T[];
  selectedIds: string[];
  showEmptyMessage?: boolean;
  onClickCheckbox: (e: React.MouseEvent<HTMLLIElement>, item: T) => void;
  getId: (item: T) => string;
  getNameLabel: (item: T) => string;
};
