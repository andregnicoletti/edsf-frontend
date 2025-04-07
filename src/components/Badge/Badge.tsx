import React from "react";

import { Icon, Typography } from "@cpqd-quati/react";

import {
  classSize,
  colorsClassContainer,
  colorsVar,
  shapeClass,
} from "./Badge.styles";
import { BadgeProps } from "./Badge.types";

import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./Badge.styles.scss";

export const Badge: React.FC<BadgeProps> = (props) => {
  const {
    size = "medium",
    variant = "neutral",
    type = "filled",
    shape = "rounded",
  } = props;

  const {
    state: { isCreatingPDF },
  } = useExportPdfContext();

  const colorClassObject = colorsClassContainer[type][variant];
  const colorCssVar = colorsVar[type][variant];

  function onClickRightIcon(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation();
    event.preventDefault();
    if (props.onClickRightIcon) props.onClickRightIcon();
  }

  return (
    <div
      style={{
        width: props.width,
        justifyContent: props.toCenter ? "center" : "flex-start",
        marginTop: isCreatingPDF ? "0.5rem" : "0",
      }}
      className={`${classSize[size]} ${colorClassObject} ${shapeClass[shape]}`}
    >
      {props.leftIcon && (
        <button
          style={{ cursor: props.onClickLeftIcon ? "pointer" : "default" }}
          className="badge-icon-button"
          onClick={props.onClickLeftIcon}
        >
          <Icon
            iconName={props.leftIcon as any}
            size={size === "large" ? "sm" : "xs"}
            background="transparent"
            color={colorCssVar.fill}
          />
        </button>
      )}
      {props.text ? (
        <div className="badge-text-container">
          <Typography
            className={
              isCreatingPDF ? "badge-text-generating-pdf" : "badge-text"
            }
            color={colorCssVar.color}
            variant="body"
            fontWeight="regular"
            size="md"
          >
            {props.text}
          </Typography>
        </div>
      ) : (
        props.content
      )}
      {props.rightIcon && (
        <button
          style={{
            cursor: props.onClickRightIcon ? "pointer" : "default",
          }}
          className="badge-icon-button"
          onClick={onClickRightIcon}
        >
          <Icon
            iconName={props.rightIcon as any}
            color={colorCssVar.fill}
            size={size === "large" ? "sm" : "xs"}
            background="transparent"
          />
        </button>
      )}
    </div>
  );
};
