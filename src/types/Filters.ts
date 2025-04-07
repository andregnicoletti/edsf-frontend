export enum FilterType {
  COURSE = "course",
  CITY = "city",
  STATE = "state",
  PRODUCER = "producer",
}

export type SelectCheckboxFilterPropsBase<T> = {
  items: T[];
  selectedIds: string[];
  onChangeSelectedIds: (selectedIds: string[]) => void;
  loading?: boolean;
};

export type SelectCheckboxFilterProps<T> = SelectCheckboxFilterPropsBase<T> & {
  getId: (item: T) => string;
  getName: (item: T) => string;
  getNameLabel: (item: T) => string;
};
