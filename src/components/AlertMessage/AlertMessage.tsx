import React from "react";

import {
  AlertMessageProps,
  AlertMessageVariant,
  ClassesByVariant,
} from "./AlertMessage.types";

import "./AlertMessage.styles.css";

const classesByVariant: ClassesByVariant = {
  error: {
    container: "alert-message-container",
    title: "alert-message-title",
    message: "alert-message",
  },
  success: {
    container: "alert-message-container alert-message-container-success",
    title: "alert-message-title alert-texts-success",
    message: "alert-message alert-texts-success",
  },
};

const iconByVariant: Record<AlertMessageVariant, string> = {
  error: "/info-red.svg",
  success: "/check-green.svg",
};

export const AlertMessage: React.FC<AlertMessageProps> = (props) => {
  const { variant = "error", isClosable, title, message, onClose } = props;

  if (!props.show) return null;

  return (
    <div className={classesByVariant[variant].container}>
      <div className="alert-message-icon-container">
        <img
          alt="icon"
          src={iconByVariant[variant]}
          className="alert-message-icon"
        />
      </div>
      <div className="alert-message-content">
        {message && <p className={classesByVariant[variant].title}>{title}</p>}
        {title && (
          <p className={classesByVariant[variant].message}>{message}</p>
        )}
      </div>
      {isClosable && (
        <button
          type="button"
          onClick={onClose}
          className="alert-message-icon-container"
        >
          <img alt="icon" src="/close-red.svg" className="alert-message-icon" />
        </button>
      )}
    </div>
  );
};
