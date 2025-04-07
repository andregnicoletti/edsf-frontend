import React from "react";

import { useTranslation } from "react-i18next";

import { Checkbox } from "../Checkbox/Checkbox";

import { CheckboxPrivacyPolicyProps } from "./CheckboxPrivacyPolicy.types";

import "./CheckboxPrivacyPolicy.styles.css";

export const CheckboxPrivacyPolicy: React.FC<CheckboxPrivacyPolicyProps> = (
  props
) => {
  const { t } = useTranslation();

  function onClickCheckbox(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    props.handleCheckboxChange();
  }

  return (
    <div className="flex-column">
      <div className="flex checkbox-privacy-policy">
        <Checkbox
          isChecked={props.isChecked}
          handleCheckboxChange={props.handleCheckboxChange}
        />
        <button
          onClick={onClickCheckbox}
          className="checkbox-label default-text"
        >
          {t("LandingPage.contactUs.agreeWith") + " "}
          <a
            target="_blank"
            className="checkbox-privady-link default-text"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.onClickPrivacyPolicy();
            }}
            href="http://www.google.com"
          >
            <u>{t("LandingPage.contactUs.privacyPolicy")}</u>
          </a>
        </button>
      </div>

      {props.error && <p className="input-text-error">{props.error}</p>}
    </div>
  );
};
