export type SelectCheckboxItemProps = {
  onClickCheckbox: (e: React.MouseEvent<HTMLLIElement>) => void;
  selected: boolean;
  id: string;
  nameLabel: string;
};
