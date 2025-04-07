export type SelectedsListProps<T> = {
  text: string;
  items: T[];
  selectedIds: string[];
  onClickCheckbox: (e: React.MouseEvent<HTMLLIElement>, item: T) => void;
  getId: (item: T) => string;
  getNameLabel: (item: T) => string;
};
