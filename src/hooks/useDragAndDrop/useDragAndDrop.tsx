import React from "react";

type UseDragAndDropProps<T> = {
  list: T[];
};

function useDragAndDrop<T>(props: UseDragAndDropProps<T>) {
  const [list, setList] = React.useState(props.list);

  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    const items = reorder(list, result.source.index, result.destination.index);
    setList(items);
  }

  return {
    list,
    setList,
    onDragEnd,
  };
}

export default useDragAndDrop;
