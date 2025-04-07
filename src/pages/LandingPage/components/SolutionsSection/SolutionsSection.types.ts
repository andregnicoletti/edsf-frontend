export type SolutionsProps = {
  solutionsRef: React.RefObject<HTMLDivElement>;
  onClickFindOutMore: () => void;
};

export type SolutionsItemProps = {
  title: string;
  description: string;
  imgUrl: string;
  onClickFindOutMore: () => void;
};
