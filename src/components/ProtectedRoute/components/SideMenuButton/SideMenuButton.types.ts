export type SideMenuButtonProps = {
  onClick: () => void;
  iconName: string;
  active?: boolean;
  children: string;
  isExpanded?: boolean;
};
