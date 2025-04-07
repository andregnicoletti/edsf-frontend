import React from "react";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { CustomDraggableProps } from "./CustomDraggable.types";

import "./CustomDraggable.styles.scss";

export function CustomDraggable<T extends { id: string }>(
  props: CustomDraggableProps<T>
) {
  function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const itemsReorded = reorder(
      props.list,
      result.source.index,
      result.destination.index
    );
    props.setList(itemsReorded);
  }

  React.useEffect(() => {
    props.setList(props.list);
  }, [props.list]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={props.droppableId}
        type="list"
        direction="vertical"
      >
        {(provided) => (
          <div
            key={props.droppableId}
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-column custom-draggable-list-container"
          >
            {props.list.map((item: T, index) => (
              <div className="flex" key={item.id}>
                {props.children(item, index)}
              </div>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
