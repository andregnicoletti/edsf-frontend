import React, { useMemo } from "react";

import { CheckboxProps } from "./Checkbox.types";

import "./Checkbox.styles.css";

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const buttonClass = useMemo(() => {
    let classe = "checkbox";
    if (props.isChecked) classe += " checked";
    if (props.size === "big") classe += " size-bigger";
    return classe;
  }, [props.isChecked, props.size]);

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={props.handleCheckboxChange}
    />
  );
};
