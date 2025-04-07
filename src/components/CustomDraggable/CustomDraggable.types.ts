export type CustomDraggableProps<T> = {
  list: T[];
  setList: (list: T[]) => void;
  droppableId: string;
  children(item: T, index: number): React.ReactNode;
};
