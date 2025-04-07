import React from "react";

import { Draggable } from "@hello-pangea/dnd";

import PanelBase from "../PanelBase";

import { PanelDraggableProps } from "./PanelDraggable.types";

import "./PanelDraggable.styles.scss";

export const PanelDraggable: React.FC<PanelDraggableProps> = (props) => {
  return (
    <Draggable
      key={props.idPanel}
      draggableId={props.idPanel}
      index={props.index}
    >
      {(provided) => (
        <div
          className="flex-column panel-draggable-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <PanelBase
            headerTitle={props.headerTitle}
            isCollapsable={true}
            rightComponent={props.rightComponent}
            leftIcon={
              <img
                {...provided.dragHandleProps}
                className="panel-drag-icon"
                src="/dragIndicator.svg"
                alt=""
              />
            }
          >
            {props.children}
          </PanelBase>
        </div>
      )}
    </Draggable>
  );
};
