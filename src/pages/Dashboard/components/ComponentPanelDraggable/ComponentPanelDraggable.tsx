import React from "react";

export const ComponentPanelDraggable = React.memo(
  function ComponentPanelDraggable(props: {
    index: number;
    Component: React.FC<{ exportedRef: any }>;
    addRefToUseState: (
      ref: HTMLDivElement | undefined,
      index: number,
      headerTitle: string
    ) => void;
    headerTitle: string;
  }) {
    const { Component } = props;
    return (
      <Component
        exportedRef={(el: any) =>
          props.addRefToUseState(el, props.index, props.headerTitle)
        }
      />
    );
  }
);
