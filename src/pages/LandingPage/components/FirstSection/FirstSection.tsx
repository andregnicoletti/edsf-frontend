import React from "react";

import { Trans, useTranslation } from "react-i18next";

import MenuHeader from "../MenuHeader";

import { FirstSectionProps } from "./FirstSection.types";

import logoCpqd from "@/assets/images/landingPage/logo-cpqd-black.png";
import logoEmbrapii from "@/assets/images/landingPage/logo-embrapii-black.png";
import logoJaEntendi from "@/assets/images/landingPage/logo-jaentendi-black.png";
import logoSebrae from "@/assets/images/landingPage/logo-sebrae-black.png";
import backgroundPattern from "@/assets/svgs/landingPage/patternBackgroundLandingPage.svg";

import "./FirstSection.styles.css";

export const FirstSection: React.FC<FirstSectionProps> = (props) => {
  const { t } = useTranslation();
  return (
    <section
      id="first-landing-section"
      className="flex-column"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      <MenuHeader
        onClickContactUs={props.onClickContactUs}
        onClickSolutios={props.onClickSolutios}
      />
      <div className="flex-column" id="first-landing-section-content-container">
        <div className="flex-column" id="first-landing-section-content">
          <h1 className="landing-h1">
            {t("LandingPage.firstSection.pageTitle")}
          </h1>
          <h2 className="landing-h2">
            <Trans i18nKey="LandingPage.firstSection.pageSubtitle" />
          </h2>
        </div>
        <h6 className="landing-h6" id="first-landing-partnership-text">
          {t("LandingPage.firstSection.aPartnership")}
        </h6>
        <div className="first-landing-logomarcas">
          <div className="first-landing-img-container">
            <img
              className="first-landing-img"
              src={logoJaEntendi}
              alt="logomarcas"
            />
            <img
              className="first-landing-img"
              src={logoCpqd}
              alt="logomarcas"
            />
          </div>
          <div className="first-landing-img-container">
            <img
              className="first-landing-img"
              src={logoEmbrapii}
              alt="logomarcas"
            />
            <img
              className="first-landing-img"
              src={logoSebrae}
              alt="logomarcas"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={props.onClickContactUs}
          className="first-landing-button"
        >
          {t("General.findOutMore")}
        </button>
      </div>
    </section>
  );
};
