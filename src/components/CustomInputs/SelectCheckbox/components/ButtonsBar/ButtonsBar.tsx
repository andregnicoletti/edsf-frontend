import React from "react";

import { Button } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import { ButtonsBarProps } from "./ButtonsBar.types";

import "./ButtonsBar.styles.scss";

export const ButtonsBar: React.FC<ButtonsBarProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="select-checkbox-buttons-container">
      <Button onClick={props.onCancel} style={{ flex: 1 }} variant="secondary">
        {t("SelectCheckbox.cancelButton")}
      </Button>
      <Button onClick={props.onApply} style={{ flex: 1 }} variant="primary">
        {t("SelectCheckbox.confirmButton")}
      </Button>
    </div>
  );
};
