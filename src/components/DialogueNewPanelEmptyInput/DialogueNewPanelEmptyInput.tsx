import React from "react";

import { useTranslation } from "react-i18next";

import { Dialogue } from "../Dialogue/Dialogue";

import { DialogueNewPanelEmptyInputProps } from "./DialogueNewPanelEmptyInput.types";

export const DialogueNewPanelEmptyInput: React.FC<
  DialogueNewPanelEmptyInputProps
> = (props) => {
  const { t } = useTranslation();

  return (
    <Dialogue
      open={props.show}
      cancelButtonText={t(
        "Dashboard.ConfigurePanel.confirmCleanInput.cancelButton"
      )}
      confirmButtonText={t(
        "Dashboard.ConfigurePanel.confirmCleanInput.confirmButton"
      )}
      onPressCancel={props.onClose}
      onPressConfirm={props.onConfirm}
      title={t("Dashboard.ConfigurePanel.confirmCleanInput.title")}
      text={t("Dashboard.ConfigurePanel.confirmCleanInput.message")}
    />
  );
};
