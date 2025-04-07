import React, { useMemo, useState } from "react";

import { CustomSelectOption, CustomSelectProps } from "./CustomSelect.types";

import "./CustomSelect.styles.css"; // Arquivo CSS para estilos

export const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: CustomSelectOption) => {
    props.onChangeOption(option);
    setIsOpen(false);
  };

  const selectInputClass = useMemo(() => {
    let classe = "input-default select-header";
    if (isOpen) classe += " open";
    if (props.selectedOption.default) classe += " default-option";
    return classe;
  }, [isOpen, props.selectedOption]);

  const optionClass = (option: CustomSelectOption) => {
    if (option.default) return "select-option default-option";
    return "select-option";
  };

  return (
    <div className="flex-column ">
      <label htmlFor="knowingAboutUs" className="landing-label label">
        {props.label}
      </label>
      <div className="flex custom-select">
        <button
          type="button"
          className={selectInputClass}
          onClick={() => setIsOpen(!isOpen)}
        >
          {props.selectedOption.label}
        </button>
        {isOpen && (
          <ul className="select-options">
            {props.options.map((option) => (
              <button
                key={option.value}
                className={optionClass(option)}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
