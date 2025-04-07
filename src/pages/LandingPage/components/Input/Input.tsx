import React from "react";

import { useMask } from "@react-input/mask";

import { InputProps } from "./Input.types";

import "./Input.styles.css";

const inputErrorClass: Record<string, string> = {
  true: "input-default input-error",
  false: "input-default",
};

export const Input: React.FC<InputProps> = (props) => {
  const { type = "input" } = props;
  const inputRef = useMask({
    mask: props.mask,
    replacement: props.replacement,
  });

  return (
    <div className="flex-column">
      <label htmlFor={props.for} className="landing-label label">
        {props.label}
      </label>
      {type === "input" ? (
        <input
          type="text"
          className={inputErrorClass[String(!!props.error)]}
          id={props.for}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          ref={props.mask ? inputRef : undefined}
        />
      ) : (
        <textarea
          className="input-textarea"
          id={props.for}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
        />
      )}
      {props.error && <p className="input-text-error">{props.error}</p>}
    </div>
  );
};
